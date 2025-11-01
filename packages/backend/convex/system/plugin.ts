import { v } from "convex/values";
import { internalMutation, internalQuery } from "../_generated/server";

export const upsert = internalMutation({
  args: {
    service: v.union(v.literal("vapi")),
    orgId: v.string(),
    secretName: v.string(),
  },
  handler: async (ctx, args) => {
    const existingPlugin = await ctx.db
      .query("plugin")
      .withIndex("by_orgId_and_service", (q) =>
        q.eq("orgId", args.orgId).eq("service", args.service)
      )
      .unique();

    if (existingPlugin) {
      await ctx.db.patch(existingPlugin._id, {
        service: args.service,
        secretName: args.secretName,
      });
    } else {
      await ctx.db.insert("plugin", {
        orgId: args.orgId,
        service: args.service,
        secretName: args.secretName,
      });
    }
  },
});

export const getByOrgIdAndService = internalQuery({
  args: {
    orgId: v.string(),
    service: v.union(v.literal("vapi")),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("plugin")
      .withIndex("by_orgId_and_service", (q) =>
        q.eq("orgId", args.orgId).eq("service", args.service)
      )
      .unique();
  },
});
