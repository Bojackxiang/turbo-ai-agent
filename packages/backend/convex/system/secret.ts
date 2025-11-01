import { internalActionGeneric } from "convex/server";
import { internal } from "../_generated/api";
import { internalAction } from "../_generated/server";
import { upsertSecret } from "../lib/secret";
import { v } from "convex/values";

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
