import { ConvexError, v } from "convex/values";
import { action, query } from "../_generated/server";
import { internal } from "../_generated/api";
import { supportAgent } from "../system/ai/support_agent";
import { paginationOptsValidator } from "convex/server";

// Tools
import { escalateConversation } from "../system/tools/escalateConversationTool";
import { resolveConversation } from "../system/tools/resolveConversationTool";
import { search } from "../system/tools/search";

export const create = action({
  args: {
    prompt: v.string(),
    threadId: v.string(),
    contactSessionId: v.id("contactSession"),
  },
  handler: async (ctx, args) => {
    const contactSession = await ctx.runQuery(
      internal.system.ai.contact_session.getOne,
      {
        contactSessionId: args.contactSessionId,
      }
    );

    if (!contactSession || contactSession.expiredAt < Date.now()) {
      throw new ConvexError({
        message: "Contact session not found or expired",
        code: "UNAUTHENTICATED",
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
    } else {
      await supportAgent.generateText(
        ctx,
        {
          threadId: args.threadId,
        },
        {
          prompt: args.prompt,
        }
      );
    }
  },
});

export const getMany = query({
  args: {
    threadId: v.string(),
    paginationOpts: paginationOptsValidator,
    contactSessionId: v.id("contactSession"),
  },
  handler: async (ctx, args) => {
    const contactSession = await ctx.db.get(args.contactSessionId);

    if (!contactSession || contactSession.expiredAt < Date.now()) {
      throw new ConvexError({
        message: "Contact session not found or expired",
        code: "UNAUTHENTICATED",
      });
    }

    const paginated = await supportAgent.listMessages(ctx, {
      threadId: args.threadId,
      paginationOpts: args.paginationOpts,
    });

    return paginated;
  },
});
