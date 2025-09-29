import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    name: v.string(),
  }),
  contactSession: defineTable({
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
  })
    .index("by_org_id", ["orgId"])
    .index("by_expired_at", ["expiredAt"]),
});
