import { createTool } from "@convex-dev/agent";
import { z } from "zod";
import { internal } from "../../_generated/api";
import { supportAgent } from "../ai/support_agent";

export const escalateConversation = createTool({
  description:
    "Escalate a support conversation by summarizing the issue and the resolution.",
  args: z.object({}),
  handler: async (ctx) => {
    if (!ctx.threadId) {
      return "Error: No thread ID in context";
    }

    await ctx.runMutation(internal.system.conversation.escalate, {
      threadId: ctx.threadId,
    });

    await supportAgent.saveMessage(ctx, {
      threadId: ctx.threadId,
      message: {
        role: "assistant",
        content: "Conversation will be escalated to a human agent.",
      },
    });

    return "Conversation will be escalated to a human agent";
  },
}) as ReturnType<typeof createTool>;
