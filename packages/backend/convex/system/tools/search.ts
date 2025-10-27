import { createTool } from "@convex-dev/agent";
import { internal } from "../../_generated/api";
import { logger } from "../../utils/logger";
import { z } from "zod";
import rag from "../ai/rag";

export const search = createTool({
  description:
    "Search the knowledge base for relevant information. Use this tool when users ask questions about documentation, policies, features, or any information that might be stored in the knowledge base. Always try searching first before saying you don't know something.",
  args: z.object({
    query: z
      .string()
      .describe(
        "The search query based on the user's question. Extract key terms and concepts from the user's message."
      ),
  }),
  handler: async (ctx, args) => {
    if (!ctx.threadId) {
      throw new Error(
        "Thread ID is required for searching the knowledge base."
      );
    }

    const conversation = await ctx.runQuery(
      internal.system.conversation.getByThreadId,
      {
        threadId: ctx.threadId,
      }
    );

    if (!conversation) {
      throw new Error("Conversation not found.");
    }

    const orgId = conversation.orgId;

    const searchResult = await rag.search(ctx, {
      namespace: orgId,
      query: args.query,
      limit: 5,
    });

    const contextText = `Found result in ${searchResult.entries
      .map((e) => e.title || null)
      .filter((t) => t !== null)
      .join(", ")}. Here is the context : ${searchResult.text}`;

    logger.info("Search Tool Result:", { contextText });

    return contextText;
  },
});
