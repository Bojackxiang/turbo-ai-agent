import { query } from "../_generated/server";
import { v } from "convex/values";

export const listRecentMessages = query({
  args: {
    threadId: v.string(),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    // 由于我们使用的是 @convex-dev/agent，消息存储在 agent 组件中
    // 我们需要通过 components.agent 来访问

    // 这个查询可以帮助你看到最近的消息
    const messages = await ctx.db
      .query("messages")
      .filter((q) => q.eq(q.field("threadId"), args.threadId))
      .order("desc")
      .take(args.limit || 20);

    return messages.map((msg) => ({
      _id: msg._id,
      _creationTime: msg._creationTime,
      threadId: msg.threadId,
      role: msg.message?.role,
      content: msg.message?.content,
      text: msg.text,
      agentName: msg.agentName,
    }));
  },
});

export const countMessagesByThread = query({
  args: {
    threadId: v.string(),
  },
  handler: async (ctx, args) => {
    const messages = await ctx.db
      .query("messages")
      .filter((q) => q.eq(q.field("threadId"), args.threadId))
      .collect();

    const userMessages = messages.filter(
      (m) => m.message?.role === "user" || m.role === "user"
    );
    const assistantMessages = messages.filter(
      (m) => m.message?.role === "assistant" || m.agentName
    );
    const emptyMessages = messages.filter((m) => {
      const content = m.message?.content || m.text || "";
      return typeof content === "string" && content.trim().length === 0;
    });

    return {
      total: messages.length,
      user: userMessages.length,
      assistant: assistantMessages.length,
      empty: emptyMessages.length,
      emptyMessageDetails: emptyMessages.map((m) => ({
        _id: m._id,
        _creationTime: m._creationTime,
        role: m.message?.role || m.role,
        agentName: m.agentName,
      })),
    };
  },
});
