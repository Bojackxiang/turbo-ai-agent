import { useMutation } from "convex/react";
import { mutation, query } from "../_generated/server";
import { ConvexError, v } from "convex/values";
import { supportAgent } from "../system/ai/support_agent";
import { MessageDoc, saveMessage } from "@convex-dev/agent";
import { components } from "../_generated/api";
import { paginationOptsValidator } from "convex/server";

export const getMany = query({
  args: {
    contactSessionId: v.id("contactSession"),
    paginationOpts: paginationOptsValidator,
  },
  handler: async (ctx, args) => {
    const contactSession = await ctx.db.get(args.contactSessionId);
    if (!contactSession || contactSession.expiredAt < Date.now()) {
      throw new ConvexError({
        message: "Contact session not found or expired",
        code: "UNAUTHENTICATED",
      });
    }

    const conversations = await ctx.db
      .query("conversation")
      .withIndex("by_contact_session_id", (q) =>
        q.eq("contactSessionId", args.contactSessionId)
      )
      .order("desc")
      .paginate(args.paginationOpts);

    const conversationWithLastMessage = await Promise.all(
      conversations.page.map(async (conversation) => {
        let lastMessage: MessageDoc | null = null;
        const messages = await supportAgent.listMessages(ctx, {
          threadId: conversation.threadId,
          paginationOpts: { numItems: 1, cursor: null },
        });

        if (messages.page.length > 0) {
          lastMessage = messages.page[0] ?? null;
        }

        return {
          _id: conversation._id,
          _createdAt: conversation._creationTime,
          status: conversation.status,
          orgId: conversation.orgId,
          threadId: conversation.threadId,
          lastMessage,
        };
      })
    );

    return {
      ...conversations,
      page: conversationWithLastMessage,
    };
  },
});

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

    const widgetSettings = await ctx.db
      .query("widgetSettings")
      .withIndex("by_orgId", (q) => q.eq("orgId", args.orgId))
      .unique();

    const { threadId } = await supportAgent.createThread(ctx, {
      userId: args.orgId,
    });

    await saveMessage(ctx, components.agent, {
      threadId,
      message: {
        role: "assistant",
        content:
          widgetSettings?.greetingMessage ||
          "I am Ai agent, how I can help you today",
      },
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

export const getAllForAdmin = query({
  args: {
    status: v.optional(
      v.union(
        v.literal("all"),
        v.literal("unresolved"),
        v.literal("escalated"),
        v.literal("resolved")
      )
    ),
    paginationOpts: paginationOptsValidator,
  },
  handler: async (ctx, args) => {
    // For now, let's get all conversations without authentication
    // In production, you should add proper admin authentication here

    let conversations;

    if (args.status && args.status !== "all") {
      conversations = await ctx.db
        .query("conversation")
        .filter((q) => q.eq(q.field("status"), args.status))
        .order("desc")
        .paginate(args.paginationOpts);
    } else {
      conversations = await ctx.db
        .query("conversation")
        .order("desc")
        .paginate(args.paginationOpts);
    }

    const conversationWithLastMessage = await Promise.all(
      conversations.page.map(async (conversation) => {
        let lastMessage: MessageDoc | null = null;
        const messages = await supportAgent.listMessages(ctx, {
          threadId: conversation.threadId,
          paginationOpts: { numItems: 1, cursor: null },
        });

        if (messages.page.length > 0) {
          lastMessage = messages.page[0] ?? null;
        }

        return {
          _id: conversation._id,
          _createdAt: conversation._creationTime,
          status: conversation.status,
          orgId: conversation.orgId,
          threadId: conversation.threadId,
          lastMessage,
        };
      })
    );

    return {
      ...conversations,
      page: conversationWithLastMessage,
    };
  },
});
