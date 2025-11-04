import { internalActionGeneric } from "convex/server";
import { internal } from "../_generated/api";
import { internalAction, internalQuery } from "../_generated/server";
import { upsertSecret } from "../lib/secret";
import { v } from "convex/values";
import { Doc } from "../_generated/dataModel";

export const getOneByOrgId = internalQuery({
  args: {
    serviceName: v.string(),
    orgId: v.string(),
  },
  handler: async (ctx, args): Promise<Doc<"secrets"> | null> => {
    // Query the secret by orgId and serviceName
    const secret = await ctx.db
      .query("secrets")
      .withIndex("by_orgId", (q) => q.eq("orgId", args.orgId))
      .filter((q) => q.eq(q.field("serviceName"), args.serviceName))
      .unique();

    return secret;
  },
});

export const upsert = internalAction({
  args: {
    orgId: v.string(),
    service: v.union(v.literal("vapi")),
    value: v.any(),
  },
  handler: async (ctx, args) => {
    const secretName = `tenant/${args.orgId}/${args.service}`;
    await upsertSecret(secretName, args.value);

    await ctx.runMutation(internal.system.plugin.upsert, {
      service: args.service,
      secretName,
      orgId: args.orgId,
    });

    return {
      status: "ok" as const,
    };
  },
});
