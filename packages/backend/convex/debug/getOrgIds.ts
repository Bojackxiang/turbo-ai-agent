import { query } from "../_generated/server";

export const getOrgIds = query({
  args: {},
  handler: async (ctx) => {
    // 获取所有对话以查看 orgId
    const conversations = await ctx.db.query("conversation").collect();

    const orgIds = [...new Set(conversations.map((c) => c.orgId))];

    console.log("Found orgIds:", orgIds);

    return {
      conversations: conversations.length,
      uniqueOrgIds: orgIds,
    };
  },
});
