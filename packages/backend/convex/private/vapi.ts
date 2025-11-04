import { VapiClient, Vapi } from "@vapi-ai/server-sdk";
import { internal } from "../_generated/api";
import { action } from "../_generated/server";
import { ConvexError } from "convex/values";
import { Doc } from "../_generated/dataModel";

export const getPhoneNumber = action({
  args: {},
  handler: async (ctx): Promise<Vapi.PhoneNumbersListResponseItem[]> => {
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

    const plugin = await ctx.runQuery(
      internal.system.plugin.getByOrgIdAndService,
      {
        orgId,
        service: "vapi",
      }
    );

    if (!plugin) {
      throw new ConvexError({
        message: "Plugin is not found",
        code: "NOT_FOUND",
      });
    }

    const secret: Doc<"secrets"> | null = await ctx.runQuery(
      internal.system.secret.getOneByOrgId,
      {
        serviceName: "vapi",
        orgId,
      }
    );

    if (!secret) {
      throw new ConvexError({
        message: "Secret is not found",
        code: "NOT_FOUND",
      });
    }

    const vapiLClient: VapiClient = new VapiClient({
      token: secret.privateKey,
    });

    const phoneNumbers: any = await vapiLClient.phoneNumbers.list();

    return phoneNumbers;
  },
});

export const getAssistants = action({
  args: {},
  handler: async (ctx): Promise<Vapi.Assistant[]> => {
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

    const plugin = await ctx.runQuery(
      internal.system.plugin.getByOrgIdAndService,
      {
        orgId,
        service: "vapi",
      }
    );

    if (!plugin) {
      throw new ConvexError({
        message: "Plugin is not found",
        code: "NOT_FOUND",
      });
    }

    const secret = await ctx.runQuery(internal.system.secret.getOneByOrgId, {
      serviceName: "vapi",
      orgId,
    });

    if (!secret) {
      throw new ConvexError({
        message: "Secret is not found",
        code: "NOT_FOUND",
      });
    }

    const vapiLClient = new VapiClient({
      token: secret.privateKey,
    });

    const assistants = await vapiLClient.assistants.list();

    return assistants;
  },
});
