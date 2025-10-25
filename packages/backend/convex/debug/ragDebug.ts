import { action } from "../_generated/server";
import { v } from "convex/values";
import rag from "../system/ai/rag";
import { logger } from "../utils/logger";

export const debugRAGEntries = action({
  args: {
    namespace: v.string(),
  },
  handler: async (ctx, args) => {
    // 获取指定 namespace 的所有 entries
    const namespace = await rag.getNamespace(ctx, {
      namespace: args.namespace,
    });

    if (!namespace) {
      return { error: "Namespace not found" };
    }

    const entries = await rag.list(ctx, {
      namespaceId: namespace.namespaceId,
      paginationOpts: { numItems: 20, cursor: null },
    });

    return entries;
  },
});

export const debugSearchResult = action({
  args: {
    namespace: v.string(),
    query: v.string(),
  },
  handler: async (ctx, args) => {
    const searchResult = await rag.search(ctx, {
      namespace: args.namespace,
      query: args.query,
      limit: 5,
    });

    return searchResult;
  },
});
