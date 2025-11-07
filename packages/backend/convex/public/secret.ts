import { ConvexError, v } from "convex/values";
import { action } from "../_generated/server";
import { internal } from "../_generated/api";
import { metadata } from "../../../../apps/web/app/layout";

export const getVapiSecret = action({
  args: {
    orgId: v.string(),
  },
  handler: async (ctx, args) => {
    const secretData = "";

    const orgId = args.orgId;

    const plugin = await ctx.runQuery(
      internal.system.plugin.getByOrgIdAndService,
      {
        orgId: orgId,
        service: "vapi",
      }
    );

    if (!plugin) {
      throw new ConvexError({
        message: "No plugin is found",
        status: "NOT_FOUND",
      });
    }

    const secret: any = await ctx.runQuery(
      internal.system.secret.getOneByOrgId,
      {
        orgId: orgId,
        serviceName: "vapi",
      }
    );

    if (!secret) {
      throw new ConvexError({
        message: "No secret is found",
        status: "NOT_FOUND",
      });
    }

    const { publicKey } = secret;

    if (!publicKey) {
      throw new ConvexError({
        message: "No public secret is found",
        status: "NOT_FOUND",
      });
    }

    return publicKey;
  },
});
