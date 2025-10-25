/**
 * 调试工具 - 用于追踪空消息问题
 *
 * 运行方式:
 * npx convex run debug/emptyMessageTracker:checkEmptyMessages '{"threadId":"your-thread-id"}'
 */

import { internal } from "../_generated/api";
import { action } from "../_generated/server";
import { v } from "convex/values";
import { logger } from "../utils/logger";

export const checkEmptyMessages = action({
  args: {
    threadId: v.string(),
  },
  handler: async (ctx, args) => {
    return {
      message:
        "Please check the messages table in Convex dashboard for thread: " +
        args.threadId,
      instructions: [
        "1. Go to Convex Dashboard",
        "2. Navigate to the 'messages' table in the agent component",
        `3. Filter by threadId = "${args.threadId}"`,
        "4. Look for messages with empty 'text' or 'message.content' fields",
      ],
      threadId: args.threadId,
    };
  },
});
