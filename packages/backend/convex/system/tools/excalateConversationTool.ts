import { createTool } from "@convex-dev/agent";
import { z } from "zod";
import { internal } from "../../_generated/api";
import { supportAgent } from "../ai/support_agent";

export const escalateConversation = createTool({
  description:
    "Escalate a support conversation by summarizing the issue and the resolution.",
  args: z.object({}),
  handler: async (ctx) => {
    try {
      if (!ctx.threadId) {
        return "Error: No thread ID in context";
      }

      await ctx.runMutation(internal.system.conversation.escalate, {
        threadId: ctx.threadId,
      });
    } catch (error) {
      await supportAgent.saveMessage(ctx, {
        threadId: ctx.threadId || "",
        message: {
          role: "assistant",
          content: `Error escalating conversation: ${
            error instanceof Error ? error.message : String(error)
          }`,
        },
      });
      return `Error escalating conversation: ${
        error instanceof Error ? error.message : String(error)
      }`;
    }
  },
}) as ReturnType<typeof createTool>;
