import { google } from "@ai-sdk/google";
import { Agent } from "@convex-dev/agent";
import { components } from "../../_generated/api";

// Ensure components.agent has all required properties for Agent constructor
export const supportAgent = new Agent(components.agent, {
  chat: google("gemini-1.5-flash"),
  name: "Customer Support Agent",
  instructions:
    "You are a helpful customer support agent. Always be polite and try to solve customer problems efficiently.",
  maxSteps: 5,
});
