import { v } from "convex/values";
import { action } from "../_generated/server";
import { createClerkClient } from "@clerk/backend";

const clerkClient = createClerkClient({
  secretKey: process.env.CLERK_SECRET_KEY!,
});

export const validate = action({
  args: { orgId: v.string() },
  handler: async (ctx, args) => {
    try {
      const orgId = await clerkClient.organizations.getOrganization({
        organizationId: args.orgId,
      });

      return { valid: true };
    } catch (error) {
      return { valid: false, reason: "organization not found" };
    }
  },
});
