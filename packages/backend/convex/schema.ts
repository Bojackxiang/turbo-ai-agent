import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  secrets: defineTable({
    orgId: v.string(),
    serviceName: v.string(),
    secretName: v.string(),
    publicKey: v.string(),
    privateKey: v.string(),
  }).index("by_orgId", ["orgId"]),
  plugin: defineTable({
    orgId: v.string(),
    service: v.union(v.literal("vapi")),
    secretName: v.string(),
  })
    .index("by_orgId", ["orgId"])
    .index("by_orgId_and_service", ["orgId", "service"]),
  conversation: defineTable({
    threadId: v.string(),
    orgId: v.string(),
    contactSessionId: v.id("contactSession"),
    status: v.union(
      v.literal("unresolved"),
      v.literal("escalated"),
      v.literal("resolved")
    ),
  })
    .index("by_org_id", ["orgId"])
    .index("by_contact_session_id", ["contactSessionId"])
    .index("by_thread_id", ["threadId"])
    .index("by_status_and_org_id", ["status", "orgId"]),
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
