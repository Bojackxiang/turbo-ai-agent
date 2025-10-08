"use client";

import {
  ListIcon,
  MessageCircle,
  Clock,
  User,
  Bot,
  AlertCircle,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { useState } from "react";

// shadcn component
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectValue,
  SelectItem,
} from "@/components/ui/select";

// convex
import { usePaginatedQuery } from "convex/react";
import { api } from "@repo/backend/convex/_generated/api";

// Helper functions
const formatTimeAgo = (timestamp: number): string => {
  const now = Date.now();
  const diff = now - timestamp;

  const minutes = Math.floor(diff / (1000 * 60));
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  return `${days}d ago`;
};

const truncateText = (text: string, maxLength: number = 120): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + "...";
};

const getTruncateLength = (width: string = "default"): number => {
  switch (width) {
    case "small":
      return 30;
    case "medium":
      return 60;
    case "large":
      return 100;
    default:
      return 80;
  }
};

const extractMessageText = (lastMessage: any): string => {
  if (!lastMessage) return "No messages yet";

  // Handle different message content formats
  if (typeof lastMessage.text === "string") {
    return lastMessage.text;
  }

  if (lastMessage.message?.content) {
    if (typeof lastMessage.message.content === "string") {
      return lastMessage.message.content;
    }

    if (Array.isArray(lastMessage.message.content)) {
      const textContent = lastMessage.message.content.find(
        (item: any) => item.type === "text"
      );
      return textContent?.text || "Message content";
    }
  }

  return "Message content";
};

const ConversationPanel = () => {
  const [filterValue, setFilterValue] = useState("all");

  const conversations = usePaginatedQuery(
    api.public.conversation.getAllForAdmin,
    {
      status: filterValue as "all" | "unresolved" | "escalated" | "resolved",
    },
    { initialNumItems: 20 }
  );

  const handleConversationClick = (
    conversationId: string,
    threadId: string
  ) => {
    // TODO: Navigate to conversation detail or open chat view
    console.log("Open conversation:", { conversationId, threadId });
  };

  console.log(JSON.stringify(conversations, null, 2));

  return (
    <div className="flex h-full w-full flex-col bg-gradient-to-b from-slate-50 to-slate-100 min-w-0">
      <div className="flex flex-col gap-2 sm:gap-3 border-b border-slate-200 p-2 sm:p-4 min-w-0">
        <div className="flex items-center justify-between min-w-0">
          <h2 className="text-base sm:text-lg font-semibold text-slate-800 truncate">
            Conversations
          </h2>
          <span className="text-xs sm:text-sm text-slate-500 flex-shrink-0">
            Filter:
          </span>
        </div>

        <Select
          value={filterValue}
          onValueChange={setFilterValue}
          defaultValue="all"
        >
          <SelectTrigger className="h-8 sm:h-10 border border-slate-200 px-2 sm:px-3 shadow-sm ring-0 hover:bg-slate-50 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 w-full bg-white rounded-lg transition-all duration-200 min-w-0">
            <SelectValue placeholder="Select filter" />
          </SelectTrigger>
          <SelectContent className="min-w-[120px] sm:min-w-[200px]">
            <SelectItem value="all">
              <div className="flex items-center gap-2">
                <ListIcon className="size-4 text-slate-600" />
                <span>All Conversations</span>
              </div>
            </SelectItem>
            <SelectItem value="unresolved">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-orange-400"></div>
                <span>Unresolved</span>
              </div>
            </SelectItem>
            <SelectItem value="escalated">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-red-400"></div>
                <span>Escalated</span>
              </div>
            </SelectItem>
            <SelectItem value="resolved">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-400"></div>
                <span>Resolved</span>
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <ScrollArea className="flex-1">
        {conversations.isLoading ? (
          <div className="flex items-center justify-center p-8">
            <div className="flex items-center space-x-2 text-slate-500">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-slate-400"></div>
              <span>Loading conversations...</span>
            </div>
          </div>
        ) : conversations.results && conversations.results.length > 0 ? (
          <div className="p-1 sm:p-2 space-y-1">
            {conversations.results.map((conversation: any) => {
              const lastMessage = conversation.lastMessage;
              const messageText = extractMessageText(lastMessage);
              const isAssistant =
                lastMessage?.message?.role === "assistant" ||
                lastMessage?.agentName;
              const hasError = lastMessage?.status === "failed";
              const isInitialMessage = lastMessage?.order === 0;

              return (
                <div
                  key={conversation._id}
                  onClick={() =>
                    handleConversationClick(
                      conversation._id,
                      conversation.threadId
                    )
                  }
                  className="group p-1 sm:p-2 md:p-3 border border-slate-200/60 rounded-lg bg-white/80 backdrop-blur-sm hover:bg-white hover:shadow-md hover:border-slate-300/60 cursor-pointer transition-all duration-200 hover:-translate-y-0.5 min-w-0 w-full"
                >
                  {/* Header */}
                  <div className="flex items-start justify-between mb-1 sm:mb-2 min-w-0">
                    <div className="flex items-start space-x-1 sm:space-x-2 min-w-0 flex-1 overflow-hidden">
                      {/* Avatar */}
                      <div
                        className={`flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 rounded flex items-center justify-center ${
                          isAssistant
                            ? "bg-gradient-to-br from-blue-500 to-blue-600 text-white"
                            : "bg-gradient-to-br from-slate-400 to-slate-500 text-white"
                        }`}
                      >
                        {isAssistant ? (
                          <Bot className="h-2 w-2 sm:h-3 sm:w-3 md:h-4 md:w-4" />
                        ) : (
                          <User className="h-2 w-2 sm:h-3 sm:w-3 md:h-4 md:w-4" />
                        )}
                      </div>

                      {/* Title and content */}
                      <div className="min-w-0 flex-1 overflow-hidden">
                        <div className="flex items-center space-x-1 mb-0.5 sm:mb-1 min-w-0">
                          <h3 className="font-medium text-slate-900 text-xs sm:text-sm truncate flex-1">
                            {isAssistant ? "AI Assistant" : "Customer"}
                          </h3>
                          {isInitialMessage && (
                            <span className="px-1 py-0.5 bg-blue-100 text-blue-700 text-xs rounded font-medium flex-shrink-0">
                              New
                            </span>
                          )}
                        </div>

                        {/* Message preview */}
                        {lastMessage ? (
                          <div className="space-y-0.5 sm:space-y-1 min-w-0">
                            {hasError && (
                              <div className="flex items-center space-x-1 p-1 bg-red-50 border border-red-200 rounded text-xs min-w-0">
                                <XCircle className="h-2 w-2 sm:h-3 sm:w-3 text-red-500 flex-shrink-0" />
                                <span className="text-red-700 font-medium truncate flex-1">
                                  Failed
                                </span>
                              </div>
                            )}

                            <p className="text-xs text-slate-700 leading-tight line-clamp-2 break-words overflow-hidden">
                              {truncateText(messageText, 40)}
                            </p>
                          </div>
                        ) : (
                          <div className="flex items-center space-x-1 p-1 bg-slate-50 rounded text-xs min-w-0">
                            <MessageCircle className="h-2 w-2 sm:h-3 sm:w-3 text-slate-400 flex-shrink-0" />
                            <span className="text-slate-500 truncate flex-1">
                              No messages
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Status and time - Compact */}
                    <div className="flex flex-col items-end space-y-0.5 sm:space-y-1 ml-1 sm:ml-2 flex-shrink-0">
                      {/* Status indicator */}
                      <div
                        className={`flex items-center space-x-0.5 sm:space-x-1 px-1 sm:px-1.5 py-0.5 rounded text-xs font-medium ${
                          conversation.status === "unresolved"
                            ? "bg-orange-100 text-orange-700"
                            : conversation.status === "escalated"
                              ? "bg-red-100 text-red-700"
                              : "bg-green-100 text-green-700"
                        }`}
                      >
                        {conversation.status === "unresolved" ? (
                          <AlertCircle className="h-2 w-2 sm:h-2.5 sm:w-2.5" />
                        ) : conversation.status === "escalated" ? (
                          <XCircle className="h-2 w-2 sm:h-2.5 sm:w-2.5" />
                        ) : (
                          <CheckCircle className="h-2 w-2 sm:h-2.5 sm:w-2.5" />
                        )}
                        <span className="hidden md:inline capitalize text-xs">
                          {conversation.status}
                        </span>
                      </div>

                      {/* Time */}
                      <div className="flex items-center space-x-0.5 sm:space-x-1 text-xs text-slate-500">
                        <Clock className="h-2 w-2 sm:h-2.5 sm:w-2.5 flex-shrink-0" />
                        <span className="text-xs truncate">
                          {lastMessage
                            ? formatTimeAgo(lastMessage._creationTime)
                            : formatTimeAgo(conversation._createdAt)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Optional metadata - Only show when panel is wide enough */}
                  {lastMessage && (
                    <div className="hidden xl:flex items-center justify-between pt-1 mt-1 border-t border-slate-100 min-w-0">
                      <div className="flex items-center space-x-2 text-xs text-slate-500 min-w-0 overflow-hidden">
                        {lastMessage.agentName && (
                          <span className="truncate flex-1">
                            {lastMessage.agentName}
                          </span>
                        )}
                        {lastMessage.model && (
                          <span className="truncate flex-1">
                            {lastMessage.model}
                          </span>
                        )}
                        {lastMessage.usage && (
                          <span className="flex-shrink-0">
                            {lastMessage.usage.totalTokens}t
                          </span>
                        )}
                      </div>

                      <div className="opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
                        <MessageCircle className="h-2.5 w-2.5 text-slate-400" />
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <NoMessagePlaceHolder />
        )}
      </ScrollArea>
    </div>
  );
};

export default ConversationPanel;

const NoMessagePlaceHolder = () => {
  return (
    <div className="flex-1 p-8">
      <div className="text-center text-slate-500 mt-12">
        <div className="relative mb-6">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 mx-auto flex items-center justify-center">
            <MessageCircle className="h-8 w-8 text-slate-400" />
          </div>
          <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
            <span className="text-white text-xs font-bold">0</span>
          </div>
        </div>
        <h3 className="text-lg font-semibold text-slate-800 mb-2">
          No conversations yet
        </h3>
        <p className="text-sm text-slate-600 max-w-sm mx-auto leading-relaxed">
          Customer conversations will appear here once they start chatting with
          your AI assistant.
        </p>
        <div className="mt-6 p-3 bg-blue-50 border border-blue-100 rounded-lg max-w-sm mx-auto">
          <p className="text-sm text-blue-700 font-medium">
            💡 Conversations update in real-time
          </p>
        </div>
      </div>
    </div>
  );
};
