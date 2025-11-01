import { ConvexError, v } from "convex/values";
import { mutation, query } from "../_generated/server";
import { info } from "../utils/logger";

export const getOneByOrgId = query({
  args: {
    serviceName: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    // Check authentication first
    if (identity === null) {
      throw new ConvexError({
        message: "Not authenticated",
        code: "UNAUTHENTICATED",
      });
    }

    // Then check organization ID
    const orgId = identity.orgId as string;
    if (!orgId) {
      throw new ConvexError({
        message: "Organization ID is required",
        code: "INVALID_REQUEST",
      });
    }

    // Query the secret by orgId and serviceName
    const secret = await ctx.db
      .query("secrets")
      .withIndex("by_orgId", (q) => q.eq("orgId", orgId))
      .filter((q) => q.eq(q.field("serviceName"), args.serviceName))
      .unique();

    return secret;
  },
});

export const create = mutation({
  args: {
    serviceName: v.string(),
    publicKey: v.string(),
    privateKey: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    // Check authentication first
    if (identity === null) {
      throw new ConvexError({
        message: "Not authenticated",
        code: "UNAUTHENTICATED",
      });
    }

    // Then check organization ID
    const orgId = identity.orgId as string;
    if (!orgId) {
      throw new ConvexError({
        message: "Organization ID is required",
        code: "INVALID_REQUEST",
      });
    }

    // Check if secret already exists for this service
    const existingSecret = await ctx.db
      .query("secrets")
      .withIndex("by_orgId", (q) => q.eq("orgId", orgId))
      .filter((q) => q.eq(q.field("serviceName"), args.serviceName))
      .unique();

    if (existingSecret) {
      throw new ConvexError({
        message: `Secret for service "${args.serviceName}" already exists`,
        code: "ALREADY_EXISTS",
      });
    }

    const secretName = `${args.serviceName}/${orgId}`;

    const secretId = await ctx.db.insert("secrets", {
      orgId,
      serviceName: args.serviceName,
      secretName: secretName,
      publicKey: args.publicKey,
      privateKey: args.privateKey,
    });

    return secretId;
  },
});

export const remove = mutation({
  args: {
    serviceName: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    // Check authentication first
    if (identity === null) {
      throw new ConvexError({
        message: "Not authenticated",
        code: "UNAUTHENTICATED",
      });
    }

    // Then check organization ID
    const orgId = identity.orgId as string;
    if (!orgId) {
      throw new ConvexError({
        message: "Organization ID is required",
        code: "INVALID_REQUEST",
      });
    }

    // Find the secret to delete
    const secret = await ctx.db
      .query("secrets")
      .withIndex("by_orgId", (q) => q.eq("orgId", orgId))
      .filter((q) => q.eq(q.field("serviceName"), args.serviceName))
      .unique();

    if (!secret) {
      throw new ConvexError({
        message: `Secret for service "${args.serviceName}" not found`,
        code: "NOT_FOUND",
      });
    }

    // Delete the secret
    await ctx.db.delete(secret._id);

    return { success: true, deletedService: args.serviceName };
  },
});
