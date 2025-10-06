import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MessageCircle, Clock, User } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  formatTimeAgo,
  getMessageText,
  truncateText,
} from "../utils/conversation-utils";
import { Id } from "@repo/backend/convex/_generated/dataModel";

interface ConversationCardProps {
  conversation: {
    _id: Id<"conversation">;
    _createdAt: number;
    threadId: string;
    status: "unresolved" | "escalated" | "resolved";
    lastMessage?: {
      _creationTime: number;
      message?: {
        role: string;
        content: any;
      };
      text?: string;
    };
  };
  onClick: (conversationId: Id<"conversation">) => void;
}

export const ConversationCard: React.FC<ConversationCardProps> = ({
  conversation,
  onClick,
}) => {
  const lastMessage = conversation.lastMessage;
  const messageText = getMessageText(lastMessage);
  const isAssistant = lastMessage?.message?.role === "assistant";

  return (
    <Button
      variant="ghost"
      className="w-full p-0 h-auto hover:bg-transparent group"
      onClick={() => onClick(conversation._id)}
    >
      <div
        className="w-full p-5 rounded-2xl bg-white/90 backdrop-blur-xl border border-gray-200/60 shadow-md hover:shadow-2xl hover:bg-white hover:border-gray-300/80 transition-all duration-300 group-hover:scale-[1.02] group-hover:-translate-y-1"
        style={{
          boxShadow:
            "0 4px 20px rgba(0, 0, 0, 0.08), 0 1px 3px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div className="flex items-start space-x-4">
          {/* Modern Avatar with Gradient */}
          <div
            className={cn(
              "flex-shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center relative overflow-hidden",
              isAssistant
                ? "bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500"
                : "bg-gradient-to-br from-gray-400 via-gray-500 to-gray-600"
            )}
          >
            <div className="absolute inset-0 bg-white/20 backdrop-blur-sm"></div>
            {isAssistant ? (
              <MessageCircle className="h-6 w-6 text-white relative z-10" />
            ) : (
              <User className="h-6 w-6 text-white relative z-10" />
            )}
          </div>

          {/* Content Area */}
          <div className="flex-1 min-w-0 space-y-2">
            {/* Header with Status */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <h3 className="font-semibold text-gray-900 text-base">
                  {isAssistant ? "AI Assistant" : "Customer"}
                </h3>
                <div className="flex items-center space-x-1">
                  <div
                    className={cn(
                      "w-2 h-2 rounded-full",
                      conversation.status === "unresolved"
                        ? "bg-orange-400"
                        : conversation.status === "escalated"
                          ? "bg-red-400"
                          : "bg-green-400"
                    )}
                  ></div>
                  <span className="text-xs font-medium text-gray-600 capitalize">
                    {conversation.status}
                  </span>
                </div>
              </div>

              {/* Modern Time Badge */}
              <div className="px-3 py-1 rounded-full bg-gray-100 backdrop-blur-sm border border-gray-200/60 shadow-sm">
                <div className="flex items-center space-x-1">
                  <Clock className="h-3 w-3 text-gray-500" />
                  <span className="text-xs font-medium text-gray-600">
                    {lastMessage
                      ? formatTimeAgo(lastMessage._creationTime)
                      : formatTimeAgo(conversation._createdAt)}
                  </span>
                </div>
              </div>
            </div>

            {/* Message Preview with Modern Typography */}
            <div className="relative text-left">
              <p
                className="text-sm text-gray-700 leading-relaxed font-medium overflow-hidden text-left"
                style={{
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical" as const,
                }}
              >
                {truncateText(messageText)}
              </p>
              {/* Gradient Fade Effect */}
              <div className="absolute bottom-0 right-0 w-8 h-5 bg-gradient-to-l from-white via-white/80 to-transparent pointer-events-none"></div>
            </div>

            {/* Interaction Hint */}
            <div className="flex items-center justify-between pt-1">
              <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <div className="w-1 h-1 rounded-full bg-blue-400"></div>
                <span className="text-xs text-blue-600 font-medium">
                  Click to open
                </span>
              </div>

              {/* Modern Arrow Indicator */}
              <div className="w-6 h-6 rounded-full bg-gray-100 border border-gray-200/60 flex items-center justify-center opacity-70 group-hover:opacity-100 group-hover:bg-blue-100 group-hover:border-blue-200 transition-all duration-200 shadow-sm">
                <ArrowLeft className="h-3 w-3 text-gray-600 group-hover:text-blue-600 rotate-180" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Button>
  );
};
