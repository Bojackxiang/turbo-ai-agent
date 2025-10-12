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
    const conversations = await ctx.db
      .query("conversation")
      .withIndex("by_thread_id", (q) => q.eq("threadId", args.threadId))
      .unique();
    return conversations;
  },
});
