import { ConvexError, v } from "convex/values";
import { mutation, query } from "../_generated/server";
import { paginationOptsValidator, PaginationResult } from "convex/server";
import { MessageDoc, saveMessage } from "@convex-dev/agent";
import { supportAgent } from "../system/ai/support_agent";
import { Doc } from "../_generated/dataModel";
import { components } from "../_generated/api";

export const getMany = query({
  args: {
    status: v.optional(
      v.union(
        v.literal("all"),
        v.literal("unresolved"),
        v.literal("escalated"),
        v.literal("resolved")
      )
    ),
    threadId: v.string(),
    paginationOpts: paginationOptsValidator,
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new ConvexError({
        message: "Not authenticated",
        code: "UNAUTHENTICATED",
      });
    }

    const orgId = identity.orgId as string;
    if (!orgId) {
      throw new ConvexError({
        message: "Organization ID not found in user identity",
        code: "UNAUTHENTICATED",
      });
    }

    let conversations: PaginationResult<Doc<"conversation">> | null = null;

    if (args.status) {
      conversations = await ctx.db
        .query("conversation")
        .withIndex("by_status_and_org_id", (q) =>
          q
            .eq("status", args.status as Doc<"conversation">["status"])
            .eq("orgId", orgId)
        )
        .order("desc")
        .paginate(args.paginationOpts);
    } else {
      conversations = await ctx.db
        .query("conversation")
        .withIndex("by_org_id", (q) => q.eq("orgId", orgId))
        .order("desc")
        .paginate(args.paginationOpts);
    }

    // collect conversation messages
    const conversation = await ctx.db
      .query("conversation")
      .withIndex("by_thread_id", (q) => q.eq("threadId", args.threadId))
      .unique();

    if (!conversation) {
      throw new ConvexError({
        message: "Conversation not found",
        code: "not_found",
      });
    }

    if (conversation.orgId !== orgId) {
      throw new ConvexError({
        message: "Conversation not found",
        code: "not_found",
      });
    }

    const paginated = await supportAgent.listMessages(ctx, {
      threadId: conversation.threadId,
      paginationOpts: args.paginationOpts,
    });

    return paginated;
  },
});

export const getOne = query({
  args: {
    conversationId: v.id("conversation"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new ConvexError({
        message: "Not authenticated",
        code: "UNAUTHENTICATED",
      });
    }

    const orgId = identity.orgId as string;
    if (!orgId) {
      throw new ConvexError({
        message: "Organization ID not found in user identity",
        code: "UNAUTHENTICATED",
      });
    }

    const conversation = await ctx.db.get(args.conversationId);
    if (!conversation || conversation.orgId !== orgId) {
      throw new ConvexError({
        message: "Conversation not found",
        code: "not_found",
      });
    }

    const contactSession = await ctx.db.get(conversation.contactSessionId);
    if (!contactSession) {
      throw new ConvexError({
        message: "Contact session not found",
        code: "not_found",
      });
    }

    return {
      ...conversation,
      contactSession,
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

    const { threadId } = await supportAgent.createThread(ctx, {
      userId: args.orgId,
    });

    await saveMessage(ctx, components.agent, {
      threadId,
      message: {
        role: "assistant",
        content: "Hello! How can we help you today? ",
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
