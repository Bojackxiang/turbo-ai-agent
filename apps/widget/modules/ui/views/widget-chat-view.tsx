"use client";

import { useAtomValue } from "jotai";
import {
  conversationIdAtom,
  organizationIdAtom,
} from "@/modules/atoms/widget-atoms";
import { useAction, useQuery } from "convex/react";
import { api } from "@repo/backend/convex/_generated/api";
import { contactSessionIdAtomFamily } from "../../atoms/widget-atoms";
import { useThreadMessages } from "@convex-dev/agent/react";
import { WidgetMessageInput } from "../components/widger-message-input";
import { AIConversationList } from "../components/ai-conversation-list";

export const WidgetChatView = ({}) => {
  const conversationId = useAtomValue(conversationIdAtom);
  const orgId = useAtomValue(organizationIdAtom);
  const contactSessionId = useAtomValue(
    contactSessionIdAtomFamily(orgId || "")
  );

  const conversation = useQuery(
    api.public.conversation.getOne,
    conversationId && contactSessionId
      ? {
          conversationId,
          contactSessionId,
        }
      : "skip"
  );

  const messages = useThreadMessages(
    api.public.message.getMany,
    conversation?.threadId && contactSessionId
      ? { threadId: conversation.threadId, contactSessionId }
      : "skip",
    { initialNumItems: 10 }
  );

  console.log(conversation);

  const createMessage = useAction(api.public.message.create);

  const handleSendMessage = async (messageContent: string) => {
    if (!conversationId || !contactSessionId || !conversation?.threadId) {
      throw new Error("Missing required data to send message");
    }

    try {
      await createMessage({
        threadId: conversation.threadId,
        prompt: messageContent,
        contactSessionId,
      });
    } catch (error) {
      console.error("Failed to send message:", error);
      throw error;
    }
  };

  const isDisabled =
    !conversationId ||
    !contactSessionId ||
    !conversation ||
    conversation.status === "resolved";

  return (
    <div className="h-full flex flex-col">
      {/* Messages area */}
      <div className="flex-1 overflow-auto">
        <AIConversationList
          data={messages}
          resolvedMessage={
            conversation?.status === "resolved"
              ? "The conversation is already resolved"
              : undefined
          }
        />
      </div>

      {/* Chat input - Fixed at bottom */}
      <div className="shrink-0">
        <WidgetMessageInput
          onSubmit={handleSendMessage}
          disabled={isDisabled}
          placeholder={
            isDisabled ? "Loading conversation..." : "Type your message..."
          }
        />
      </div>
    </div>
  );
};
