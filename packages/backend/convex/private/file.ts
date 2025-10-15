import { v } from "convex/values";
import { action, mutation } from "../_generated/server";
import {
  contentHashFromArrayBuffer,
  guessMimeTypeFromContents,
  guessMimeTypeFromExtension,
  vEntryId,
} from "@convex-dev/rag";
import { file } from "zod/v4";
import { extractTextContent } from "../lib/extractTextContext";
import rag from "../system/ai/rag";
import { assert } from "../utils/assert";
import { updateStatus } from "./conversation";
import { Id } from "../_generated/dataModel";

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
      console.debug("Entry already exists in RAG, skipping creation.");
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
