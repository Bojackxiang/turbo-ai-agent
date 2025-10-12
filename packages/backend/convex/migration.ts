import { mutation } from "./_generated/server";

export const fixConversationSchema = mutation({
  args: {},
  handler: async (ctx) => {
    // Get all conversations
    const conversations = await ctx.db.query("conversation").collect();

    for (const conversation of conversations) {
      // Check if the document has the old field name
      if (
        (conversation as any).contactSessionId &&
        !conversation.contactSessionId
      ) {
        await ctx.db.patch(conversation._id, {
          contactSessionId: (conversation as any).contactSessionId,
        });

        // Note: We can't remove the old field in the same operation
        // Convex will handle the field removal automatically after schema validation
      }
    }

    return { message: "Migration completed" };
  },
});

export const deleteAllConversations = mutation({
  args: {},
  handler: async (ctx) => {
    const conversations = await ctx.db.query("conversation").collect();

    for (const conversation of conversations) {
      await ctx.db.delete(conversation._id);
    }

    return { message: `Deleted ${conversations.length} conversations` };
  },
});
