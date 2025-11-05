import { v } from "convex/values";
import { mutation, query } from "../_generated/server";

/**
 * Get widget settings by organization ID
 */
export const getOne = query({
  args: {},
  handler: async (ctx) => {
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

    const widgetSettings = await ctx.db
      .query("widgetSettings")
      .withIndex("by_orgId", (q) => q.eq("orgId", orgId))
      .first();

    return widgetSettings;
  },
});

/**
 * Create or update widget settings
 */
export const upsert = mutation({
  args: {
    greetingMessage: v.string(),
    defaultMessages: v.object({
      suggestions1: v.optional(v.string()),
      suggestions2: v.optional(v.string()),
      suggestions3: v.optional(v.string()),
    }),
    vapiSettings: v.object({
      assistantId: v.optional(v.string()),
      phoneNumber: v.optional(v.string()),
    }),
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

    // Check if settings already exist
    const existing = await ctx.db
      .query("widgetSettings")
      .withIndex("by_orgId", (q) => q.eq("orgId", orgId))
      .first();

    if (existing) {
      // Update existing settings
      await ctx.db.patch(existing._id, {
        greetingMessage: args.greetingMessage,
        defaultMessages: args.defaultMessages,
        vapiSettings: args.vapiSettings,
      });
      return existing._id;
    } else {
      // Create new settings
      const settingsId = await ctx.db.insert("widgetSettings", {
        orgId,
        greetingMessage: args.greetingMessage,
        defaultMessages: args.defaultMessages,
        vapiSettings: args.vapiSettings,
      });
      return settingsId;
    }
  },
});

/**
 * Update greeting message only
 */
export const updateGreeting = mutation({
  args: {
    greetingMessage: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (identity === null) {
      throw new Error("user is not authed");
    }

    const orgId = identity.orgId as string;
    if (!orgId) {
      throw new Error("orgId is required");
    }

    const existing = await ctx.db
      .query("widgetSettings")
      .withIndex("by_orgId", (q) => q.eq("orgId", orgId))
      .first();

    if (!existing) {
      throw new Error("Widget settings not found");
    }

    await ctx.db.patch(existing._id, {
      greetingMessage: args.greetingMessage,
    });

    return existing._id;
  },
});

/**
 * Update default messages only
 */
export const updateDefaultMessages = mutation({
  args: {
    defaultMessages: v.object({
      suggestions1: v.optional(v.string()),
      suggestions2: v.optional(v.string()),
      suggestions3: v.optional(v.string()),
    }),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (identity === null) {
      throw new Error("user is not authed");
    }

    const orgId = identity.orgId as string;
    if (!orgId) {
      throw new Error("orgId is required");
    }

    const existing = await ctx.db
      .query("widgetSettings")
      .withIndex("by_orgId", (q) => q.eq("orgId", orgId))
      .first();

    if (!existing) {
      throw new Error("Widget settings not found");
    }

    await ctx.db.patch(existing._id, {
      defaultMessages: args.defaultMessages,
    });

    return existing._id;
  },
});

/**
 * Update VAPI settings only
 */
export const updateVapiSettings = mutation({
  args: {
    vapiSettings: v.object({
      assistantId: v.optional(v.string()),
      phoneNumber: v.optional(v.string()),
    }),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (identity === null) {
      throw new Error("user is not authed");
    }

    const orgId = identity.orgId as string;
    if (!orgId) {
      throw new Error("orgId is required");
    }

    const existing = await ctx.db
      .query("widgetSettings")
      .withIndex("by_orgId", (q) => q.eq("orgId", orgId))
      .first();

    if (!existing) {
      throw new Error("Widget settings not found");
    }

    await ctx.db.patch(existing._id, {
      vapiSettings: args.vapiSettings,
    });

    return existing._id;
  },
});

/**
 * Delete widget settings
 */
export const remove = mutation({
  args: {},
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (identity === null) {
      throw new Error("user is not authed");
    }

    const orgId = identity.orgId as string;
    if (!orgId) {
      throw new Error("orgId is required");
    }

    const existing = await ctx.db
      .query("widgetSettings")
      .withIndex("by_orgId", (q) => q.eq("orgId", orgId))
      .first();

    console.log({ existing });

    if (!existing) {
      throw new Error("Widget settings not found");
    }

    await ctx.db.delete(existing._id);
    return existing._id;
  },
});
