import { v } from "convex/values";
import { action } from "../_generated/server";

export const getVapiSecret = action({
  args: {
    orgId: v.string(),
  },
  handler: async (ctx) => {
    const secretData = "";

    return secretData;
  },
});
