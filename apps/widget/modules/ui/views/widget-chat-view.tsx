"use client";

import React, { useEffect } from "react";
import { useAtom, useAtomValue } from "jotai";
import {
  conversationIdAtom,
  organizationIdAtom,
  widgetSettingAtom,
} from "@/modules/atoms/widget-atoms";
import { useAction, useQuery } from "convex/react";
import { api } from "@repo/backend/convex/_generated/api";
import { contactSessionIdAtomFamily } from "../../atoms/widget-atoms";
import { useThreadMessages } from "@convex-dev/agent/react";
import { WidgetMessageInput } from "../components/widger-message-input";
import { AIConversationList } from "../components/ai-conversation-list";
import { useInfiniteScroll, useChatAutoScroll } from "@repo/shared-hooks";
// import InfiniteTrigger from "../components/infinite-trigger";

export const WidgetChatView = ({}) => {
  const conversationId = useAtomValue(conversationIdAtom);
  const orgId = useAtomValue(organizationIdAtom);
  const contactSessionId = useAtomValue(
    contactSessionIdAtomFamily(orgId || "")
  );

  const [widgetSettingsValue] = useAtom(widgetSettingAtom);

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

  const { scrollRef, scrollToBottom } = useChatAutoScroll([
    messages.results?.length || 0,
    messages.status,
    messages.isLoading,
    messages.results?.[messages.results.length - 1]?.text || "",
    messages.results?.[messages.results.length - 1]?._creationTime || 0,
  ]);

  useEffect(() => {
    if (messages.results && messages.results.length > 0) {
      setTimeout(() => {
        scrollToBottom();
      }, 100);
    }
  }, [messages.results?.length, scrollToBottom]);

  useEffect(() => {
    const lastMessage = messages.results?.[messages.results.length - 1];
    if (lastMessage && lastMessage.streaming) {
      const interval = setInterval(() => {
        scrollToBottom();
      }, 200);

      return () => clearInterval(interval);
    }
  }, [
    messages.results?.[messages.results.length - 1]?.streaming,
    scrollToBottom,
  ]);

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

  const onSuggestionClick = (suggestedText: string) => {
    if (!suggestedText) return;
    handleSendMessage(suggestedText);
  };

  const isDisabled =
    !conversationId ||
    !contactSessionId ||
    !conversation ||
    conversation.status === "resolved";

  // Extract suggestions from widget settings
  const suggestions = [
    widgetSettingsValue?.defaultMessages?.suggestions1,
    widgetSettingsValue?.defaultMessages?.suggestions2,
    widgetSettingsValue?.defaultMessages?.suggestions3,
  ].filter((s): s is string => Boolean(s));

  // Show suggestions only when there are no messages yet
  const showSuggestions =
    suggestions.length > 0 &&
    (!messages.results || messages.results.length <= 1);

  return (
    <div className="h-full flex flex-col">
      {/* Messages area */}
      <div ref={scrollRef} className="flex-1 overflow-auto">
        <AIConversationList
          data={messages}
          resolvedMessage={
            conversation?.status === "resolved"
              ? "The conversation is already resolved"
              : undefined
          }
        />

        {/* Quick Suggestions - Show only when no messages */}
        {showSuggestions && (
          <div className="px-4 py-6 space-y-3">
            <div className="text-center mb-4">
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Quick Questions
              </p>
            </div>
            <div className="grid gap-2">
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => onSuggestionClick(suggestion)}
                  disabled={isDisabled}
                  className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900 border border-slate-200 dark:border-slate-700 p-3.5 text-left transition-all duration-300 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {/* Gradient overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-purple-500/5 to-blue-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Content */}
                  <div className="relative flex items-center gap-3">
                    {/* Icon */}
                    <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow duration-300">
                      <svg
                        className="w-4 h-4 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                        />
                      </svg>
                    </div>

                    {/* Text */}
                    <span className="flex-1 text-sm font-medium text-slate-700 dark:text-slate-200 group-hover:text-slate-900 dark:group-hover:text-white transition-colors duration-300">
                      {suggestion}
                    </span>

                    {/* Arrow icon */}
                    <svg
                      className="flex-shrink-0 w-5 h-5 text-slate-400 dark:text-slate-500 group-hover:text-blue-500 dark:group-hover:text-blue-400 group-hover:translate-x-1 transition-all duration-300"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>

                  {/* Bottom accent line */}
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </button>
              ))}
            </div>

            {/* Helper text */}
            <p className="text-xs text-center text-slate-400 dark:text-slate-500 mt-4">
              Or type your own question below
            </p>
          </div>
        )}
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
