import { useMutation } from "convex/react";
import { mutation, query } from "../_generated/server";
import { ConvexError, v } from "convex/values";
import { supportAgent } from "../system/ai/support_agent";

export const create = mutation({
  args: {
    orgId: v.string(),
    contactSessionId: v.id("contactSession"),
  },
  handler: async (ctx, args) => {
    const session = await ctx.db.get(args.contactSessionId);
    if (!session || session.expiredAt < Date.now()) {
      throw new ConvexError({
        message: "Contact session not found or expired",
        code: "UNAUTHENTICATED",
      });
    }

    const { threadId } = await supportAgent.createThread(ctx, {
      userId: args.orgId,
    });

    const conversationId = await ctx.db.insert("conversation", {
      contactSessionId: args.contactSessionId,
      orgId: args.orgId,
      status: "unresolved",
      threadId,
    });

    return conversationId;
  },
});

export const getOne = query({
  args: {
    conversationId: v.id("conversation"),
    contactSessionId: v.id("contactSession"),
  },
  handler: async (ctx, args) => {
    const session = await ctx.db.get(args.contactSessionId);

    if (!session || session.expiredAt < Date.now()) {
      throw new ConvexError({
        message: "Contact session not found or expired",
        code: "UNAUTHENTICATED",
      });
    }

    const conversation = await ctx.db.get(args.conversationId);

    if (!conversation) {
      return null;
    }

    if (conversation.contactSessionId !== session._id) {
      throw new ConvexError({
        message: "Conversation does not belong to the contact session",
        code: "UNAUTHENTICATED",
      });
    }

    return conversation;
  },
});
