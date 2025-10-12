import { v } from "convex/values";
import { internalMutation, internalQuery } from "../_generated/server";

export const getByThreadId = internalQuery({
  args: {
    threadId: v.string(),
  },
  handler: async (ctx, args) => {
    const conversations = await ctx.db
      .query("conversation")
      .withIndex("by_thread_id", (q) => q.eq("threadId", args.threadId))
      .unique();
    return conversations;
  },
});

export const resolve = internalMutation({
  args: {
    threadId: v.string(),
  },
  handler: async (ctx, args) => {
    // First, find the conversation by threadId
    const conversation = await ctx.db
      .query("conversation")
      .withIndex("by_thread_id", (q) => q.eq("threadId", args.threadId))
      .unique();

    if (!conversation) {
      throw new Error(`Conversation not found for threadId: ${args.threadId}`);
    }

    // Then update the conversation status using its _id
    const updatedConversation = await ctx.db.patch(conversation._id, {
      status: "resolved",
    });

    return updatedConversation;
  },
});

export const escalate = internalMutation({
  args: {
    threadId: v.string(),
  },
  handler: async (ctx, args) => {
    // First, find the conversation by threadId
    const conversation = await ctx.db
      .query("conversation")
      .withIndex("by_thread_id", (q) => q.eq("threadId", args.threadId))
      .unique();

    if (!conversation) {
      throw new Error(`Conversation not found for threadId: ${args.threadId}`);
    }

    // Then update the conversation status using its _id
    const updatedConversation = await ctx.db.patch(conversation._id, {
      status: "escalated",
    });

    return updatedConversation;
  },
});
