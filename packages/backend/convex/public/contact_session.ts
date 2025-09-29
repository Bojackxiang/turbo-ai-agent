import { v } from "convex/values";
import { mutation } from "../_generated/server";

const SESSION_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

export const create = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    orgId: v.string(),
    expiredAt: v.number(),
    metadata: v.optional(
      v.object({
        userAgent: v.string(),
        language: v.string(),
        languages: v.optional(v.string()),
        platform: v.string(),
        vender: v.string(),
        screenResolution: v.string(),
        viewportSize: v.string(),
        timezone: v.string(),
        timezoneOffset: v.number(),
        cookieEnabled: v.boolean(),
        referrer: v.string(),
        currentUtl: v.string(),
      })
    ),
  },
  handler: async (ctx, args) => {
    try {
      const now = Date.now();
      const expiredAt = args.expiredAt || now + SESSION_DURATION;

      const sessionId = await ctx.db.insert("contactSession", {
        name: args.name,
        email: args.email,
        orgId: args.orgId,
        expiredAt: expiredAt,
        metadata: args.metadata,
      });

      return sessionId;
    } catch (error) {
      throw error;
    }
  },
});
