import { ConvexError, v } from "convex/values";
import { action } from "../_generated/server";
import { internal } from "../_generated/api";
import { supportAgent } from "../system/ai/support_agent";
import { escalateConversation } from "../system/tools/excalateConversationTool";
import { resolveConversation } from "../system/tools/resolveConversationTool";
import { search } from "../system/tools/search";
import { logger } from "../utils/logger";

export const create = action({
  args: {
    prompt: v.string(),
    threadId: v.string(),
  },
  handler: async (ctx, args) => {
    if (!args.prompt || args.prompt.trim().length === 0) {
      throw new ConvexError({
        message: "Message cannot be empty",
        code: "invalid_argument",
      });
    }

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

    const shouldTriggerAgent = ["unresolved", "escalated"].includes(
      conversation.status || ""
    );

    if (shouldTriggerAgent) {
      const registeredTools = {
        escalateConversation,
        resolveConversation,
        search,
      };

      await supportAgent.generateText(
        ctx,
        {
          threadId: args.threadId,
        },
        {
          prompt: args.prompt,
          tools: registeredTools,
        }
      );

      logger.info("=== Finished supportAgent.generateText ===");
    } else {
      await supportAgent.saveMessage(ctx, {
        threadId: args.threadId,
        message: {
          role: "user",
          content: args.prompt,
        },
      });
    }
  },
});
