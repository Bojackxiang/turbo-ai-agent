import { ConvexError, v } from "convex/values";
import { mutation, query } from "../_generated/server";
import { useMutation } from "convex/react";

export const create = mutation({
  args: {
    serviceName: v.string(),
    service: v.union(v.literal("vapi")),
  },
  handler: async (ctx, args) => {
    try {
      const identity = await ctx.auth.getUserIdentity();

      // Check authentication first
      if (identity === null) {
        throw new Error("user is not authed");
      }

      // Then check organization ID
      const orgId = identity.orgId as string;
      if (!orgId) {
        throw new Error("orgId is required");
      }

      const vapiPlugin = await ctx.db
        .query("plugin")
        .withIndex("by_orgId_and_service", (q) =>
          q.eq("orgId", orgId).eq("service", "vapi")
        )
        .unique();

      if (vapiPlugin) {
        await ctx.db.patch(vapiPlugin._id, {
          secretName: args.serviceName,
          service: args.service,
        });
      } else {
        await ctx.db.insert("plugin", {
          service: args.service,
          secretName: args.serviceName,
          orgId: orgId,
        });
      }
    } catch (error: any) {
      throw new ConvexError({
        message: `Something wrong with create plugin ${error.message}`,
        code: "internal error",
      });
    }
  },
});

export const getOne = query({
  args: {
    service: v.union(v.literal("vapi")),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    // Check authentication first
    if (identity === null) {
      throw new Error("user is not authed");
    }

    // Then check organization ID
    const orgId = identity.orgId as string;
    if (!orgId) {
      throw new Error("orgId is required");
    }

    // plugin
    const plugin = await ctx.db
      .query("plugin")
      .withIndex("by_orgId_and_service", (q) =>
        q.eq("orgId", orgId).eq("service", args.service)
      )
      .unique();

    return plugin;
  },
});

export const remove = mutation({
  args: {
    service: v.union(v.literal("vapi")),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    // Check authentication first
    if (identity === null) {
      throw new Error("user is not authed");
    }

    // Then check organization ID
    const orgId = identity.orgId as string;
    if (!orgId) {
      throw new Error("orgId is required");
    }

    // plugin
    const plugin = await ctx.db
      .query("plugin")
      .withIndex("by_orgId_and_service", (q) =>
        q.eq("orgId", orgId).eq("service", args.service)
      )
      .unique();

    if (!plugin) {
      throw new ConvexError({
        message: "No plugin is found",
        code: "NOT_FOUND",
      });
    } else {
      await ctx.db.delete(plugin._id);
    }
  },
});
