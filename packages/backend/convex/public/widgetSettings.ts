import { v } from "convex/values";
import { query } from "../_generated/server";

export const getByOrgId = query({
  args: {
    orgId: v.string(),
  },
  async handler(ctx, args) {
    return await ctx.db
      .query("widgetSettings")
      .withIndex("by_orgId", (q) => q.eq("orgId", args.orgId))
      .unique();
  },
});
