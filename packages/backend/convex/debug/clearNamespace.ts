import { action } from "../_generated/server";
import { v } from "convex/values";
import rag from "../system/ai/rag";
import { logger } from "../utils/logger";

export const clearNamespace = action({
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
      paginationOpts: { numItems: 100, cursor: null },
    });

    // 删除所有 entries
    for (const entry of entries.page) {
      await rag.deleteAsync(ctx, { entryId: entry.entryId });
    }

    return {
      message: `Deleted ${entries.page.length} entries from namespace ${args.namespace}`,
      deletedCount: entries.page.length,
    };
  },
});
