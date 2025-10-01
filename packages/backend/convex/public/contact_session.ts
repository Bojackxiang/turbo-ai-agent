import { v } from "convex/values";
import { mutation } from "../_generated/server";

const SESSION_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
// const SESSION_DURATION = 5 * 1000; // 5 seconds in milliseconds

export const create = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    orgId: v.string(),
    expiredAt: v.optional(v.number()), // 改为可选参数
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
      const expiredAt = now + SESSION_DURATION;

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

export const validation = mutation({
  args: { contactSessionId: v.id("contactSession") },
  handler: async (ctx, args) => {
    const contactSession = await ctx.db.get(args.contactSessionId);

    if (!contactSession) {
      return { valid: false, reason: "contact session not found" };
    }

    const now = Date.now();

    if (contactSession.expiredAt < now) {
      return {
        valid: false,
        reason: "contact session expired",
      };
    }

    return { valid: true, contactSession };
  },
});
