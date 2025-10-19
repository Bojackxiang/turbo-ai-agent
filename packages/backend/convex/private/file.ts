import { v } from "convex/values";
import { action, mutation, query, QueryCtx } from "../_generated/server";
import {
  contentHashFromArrayBuffer,
  Entry,
  EntryId,
  guessMimeTypeFromContents,
  guessMimeTypeFromExtension,
  vEntryId,
  vNamespaceId,
} from "@convex-dev/rag";
import { file } from "zod/v4";
import { extractTextContent } from "../lib/extractTextContext";
import rag from "../system/ai/rag";
import { assert } from "../utils/assert";
import { updateStatus } from "./conversation";
import { Id } from "../_generated/dataModel";
import { paginationOptsValidator } from "convex/server";
import { metadata } from "../../../../apps/widget/app/layout";

export const list = query({
  args: {
    category: v.optional(v.string()),
    paginationOpts: paginationOptsValidator,
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    // Check authentication first
    if (identity === null) {
      throw new Error("user is not authed");
    }

    // Then check organization ID
    const orgId = identity.orgId as string;
    if (!orgId) {
      throw new Error("orgId is required");
    }

    const namespace = await rag.getNamespace(ctx, {
      namespace: orgId,
    });
    if (!namespace) {
      return { page: [], isDone: true, continueCursor: "" };
    }

    const result = await rag.list(ctx, {
      namespaceId: namespace.namespaceId,
      paginationOpts: args.paginationOpts,
    });

    const files = await Promise.all(
      result.page.map(async (entry) => {
        return _convertEntryToPublicFile(ctx, entry);
      })
    );

    const filteredFiles = args.category
      ? files.filter((file) => file.category === args.category)
      : files;

    return {
      page: filteredFiles,
      isDone: result.isDone,
      continueCursor: result.continueCursor,
    };

    return {
      page: files,
      isDone: result.isDone,
      continueCursor: result.continueCursor,
    };
  },
});

export const addFile = action({
  args: {
    fileName: v.string(),
    mimeType: v.string(),
    bytes: v.bytes(),
    category: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    // Check authentication first
    if (identity === null) {
      throw new Error("user is not authed");
    }

    // Then check organization ID
    const orgId = identity.orgId as string;
    if (!orgId) {
      throw new Error("orgId is required");
    }

    const { bytes, fileName, category } = args;

    const mimeType = args.mimeType || _guessMimeType(fileName, bytes);
    const blob = new Blob([bytes], { type: mimeType });

    const storageId = await ctx.storage.store(blob);

    const text = await extractTextContent(ctx, {
      storageId,
      fileName,
      mimeType: mimeType,
      bytes,
    });

    const { entryId, created } = await rag.add(ctx, {
      namespace: orgId,
      text: text.summary,
      title: fileName,
      key: fileName,
      metadata: {
        storageId,
        uploadBy: orgId,
        fileName,
        category: category || null,
      },
      contentHash: await contentHashFromArrayBuffer(bytes),
    });

    const validatedEntryId = assert(
      entryId,
      "Entry ID should be defined after adding to RAG"
    );

    if (!created) {
      await ctx.storage.delete(storageId);
    }

    return {
      url: await ctx.storage.getUrl(storageId),
      entryId: validatedEntryId,
    };
  },
});

export const deleteFile = mutation({
  args: { entryId: vEntryId },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    // Check authentication first
    if (identity === null) {
      throw new Error("user is not authed");
    }

    // Then check organization ID
    const orgId = identity.orgId as string;
    if (!orgId) {
      throw new Error("orgId is required");
    }

    const namespace = await rag.getNamespace(ctx, {
      namespace: orgId,
    });

    if (!namespace) {
      throw new Error("Unauthorized");
    }

    const entry = await rag.getEntry(ctx, { entryId: args.entryId });
    if (entry?.metadata?.uploadBy !== orgId) {
      throw new Error("Entry not found");
    }

    if (entry?.metadata?.storageId) {
      await ctx.storage.delete(entry.metadata.storageId as Id<"_storage">);
    }

    await rag.deleteAsync(ctx, { entryId: args.entryId });
  },
});

function _guessMimeType(fileName: string, bytes: ArrayBuffer) {
  return (
    guessMimeTypeFromContents(fileName) ||
    guessMimeTypeFromContents(bytes) ||
    "application/octet-stream"
  );
}

type _EntryMetadata = {
  storageId: Id<"_storage">;
  uploadedBy: string;
  filename: string;
  category: string | null;
};

export type _PublicFile = {
  id: EntryId;
  name: string;
  type: string;
  size: string;
  status: "ready" | "processing" | "error";
  url: string | null;
  category?: string | null;
};

const _formateFileSize = async (size: number) => {
  if (size < 1024) {
    return `${size} B`;
  } else if (size < 1024 * 1024) {
    return `${(size / 1024).toFixed(2)} KB`;
  } else if (size < 1024 * 1024 * 1024) {
    return `${(size / (1024 * 1024)).toFixed(2)} MB`;
  } else {
    return `${(size / (1024 * 1024 * 1024)).toFixed(2)} GB`;
  }
};

async function _convertEntryToPublicFile(
  ctx: QueryCtx,
  entry: Entry
): Promise<_PublicFile> {
  const metadata = entry.metadata as _EntryMetadata;
  const storageId = metadata?.storageId;

  let fileSize = "unknown";
  if (storageId) {
    try {
      const storageMetadata = await ctx.db.system.get(storageId);
      if (storageMetadata) {
        fileSize = await _formateFileSize(storageMetadata.size);
      }
    } catch (error) {
      console.error("Failed to get storage metadata:", error);
    }
  }

  const filename = entry.key || "unknown";
  const parts = filename.split(".");
  const extCandidate = parts.length > 1 ? parts[parts.length - 1] : undefined;
  const fileExt =
    extCandidate && extCandidate.length > 1 ? extCandidate : "txt";

  let status: "ready" | "processing" | "error" = "error";
  if (entry.status === "ready") {
    status = "ready";
  } else if (entry.status === "pending") {
    status = "processing";
  }

  const url = storageId ? await ctx.storage.getUrl(storageId) : null;

  return {
    id: entry.entryId,
    name: filename,
    type: fileExt,
    size: fileSize,
    status,
    url,
    category: metadata?.category || undefined,
  };
}
