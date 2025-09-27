import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getMany = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();

    const orgId = identity?.orgId as string;
    if (!orgId) {
      throw new Error(`${orgId} is required`);
    }

    if (identity === null) {
      throw new Error("user is not authed");
    }
    const users = await ctx.db.query("users").collect();
    return users;
  },
});

export const create = mutation({
  args: { name: v.string() },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (identity === null) {
      throw new Error("user is not authed");
    }

    const userId = await ctx.db.insert("users", {
      name: args.name,
    });
    return userId;
  },
});
