import { ConvexError, v } from "convex/values";
import { query } from "../_generated/server";
import { paginationOptsValidator, PaginationResult } from "convex/server";
import { MessageDoc } from "@convex-dev/agent";
import { supportAgent } from "../system/ai/support_agent";
import { Doc } from "../_generated/dataModel";

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
    contactSessionId: v.id("contactSession"),
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

    const conversationWithAdditionalData = await Promise.all(
      conversations.page.map(async (conversation) => {
        // Fetch the latest message for each conversation
        let lastMessage: MessageDoc | null = null;

        const contactSession = await ctx.db.get(conversation.contactSessionId);

        if (!contactSession) {
          return null;
        }

        const messages = await supportAgent.listMessages(ctx, {
          threadId: conversation.threadId,
          paginationOpts: { numItems: 1, cursor: null },
        });

        if (messages.page.length > 0) {
          lastMessage = messages.page[0] ?? null;
        }

        return {
          ...conversation,
          lastMessage,
          contactSession,
        };
      })
    );

    const validConversations = conversationWithAdditionalData.filter(
      (conv) => conv !== null
    );

    return {
      ...conversations,
      page: validConversations,
    };
  },
});
