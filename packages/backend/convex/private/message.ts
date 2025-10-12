import { ConvexError, v } from "convex/values";
import { action } from "../_generated/server";
import { internal } from "../_generated/api";
import { supportAgent } from "../system/ai/support_agent";
import { escalateConversation } from "../system/tools/excalateConversationTool";
import { resolveConversation } from "../system/tools/resolveConversationTool";

export const create = action({
  args: {
    prompt: v.string(),
    threadId: v.string(),
  },
  handler: async (ctx, args) => {
    const conversation = await ctx.runQuery(
      internal.system.conversation.getByThreadId,
      {
        threadId: args.threadId,
      }
    );

    if (!conversation) {
      throw new ConvexError({
        message: "Conversation not found",
        code: "not_found",
      });
    }

    if (conversation.status === "resolved") {
      throw new ConvexError({
        message: "Conversation is already resolved",
        code: "failed_precondition",
      });
    }

    await supportAgent.generateText(
      ctx,
      {
        threadId: args.threadId,
      },
      {
        prompt: args.prompt,
        tools: {
          escalateConversation,
          resolveConversation,
        },
      }
    );
  },
});
