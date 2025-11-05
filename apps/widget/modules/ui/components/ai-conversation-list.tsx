"use client";

import { Bot, User, CheckCheck, Clock, AlertCircle } from "lucide-react";

// 定义消息类型 - 适配实际的数据结构
interface Message {
  _id: string;
  _creationTime: number;
  message?: {
    content: string | Array<{ text: string; type: string }>;
    role: "user" | "assistant";
  };
  text: string;
  status: "success" | "error" | "pending";
  agentName?: string;
  model?: string;
  finishReason?: string;
  streaming?: boolean;
}

interface ConversationData {
  results: Message[];
  status?: string;
  isLoading: boolean;
}

interface AIConversationListProps {
  data: ConversationData | any;
  className?: string;
  resolvedMessage?: string;
}

export const AIConversationList = ({
  data,
  className = "",
  resolvedMessage,
}: AIConversationListProps) => {
  const { results: messages, isLoading } = data;

  // 获取消息内容文本
  const getMessageContent = (message: any): string => {
    if (message.message && typeof message.message.content === "string") {
      return message.message.content;
    }
    if (message.message && Array.isArray(message.message.content)) {
      return message.message.content
        .map((item: any) => item.text || "")
        .join("");
    }
    return message.text || "";
  };

  // 获取消息角色
  const getMessageRole = (message: any): "user" | "assistant" => {
    return message.message?.role || "assistant";
  };

  // 格式化时间
  const formatTime = (timestamp: number): string => {
    const date = new Date(timestamp);
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  // 消息状态图标
  const getStatusIcon = (status: string, streaming?: boolean) => {
    if (streaming) {
      return <Clock className="w-3 h-3 text-blue-500 animate-pulse" />;
    }
    switch (status) {
      case "success":
        return <CheckCheck className="w-3 h-3 text-green-500" />;
      case "error":
        return <AlertCircle className="w-3 h-3 text-red-500" />;
      default:
        return <Clock className="w-3 h-3 text-gray-400" />;
    }
  };

  if (!messages || messages.length === 0) {
    return (
      <div
        className={`flex flex-col items-center justify-center h-full text-gray-500 ${className}`}
      >
        <Bot className="w-12 h-12 mb-4 text-gray-300" />
        <p className="text-lg font-medium">No messages yet</p>
        <p className="text-sm">Start a conversation to see messages here</p>
      </div>
    );
  }

  return (
    <div className={`flex flex-col gap-4 p-4 ${className}`}>
      {messages.map((message: any, index: number) => {
        const isUser = getMessageRole(message) === "user";
        const isAssistant = getMessageRole(message) === "assistant";
        const content = getMessageContent(message);

        if (content.trim() === "") {
          return null;
        }

        return (
          <div
            key={message._id}
            className={`flex gap-3 ${isUser ? "flex-row-reverse" : "flex-row"} group`}
          >
            {/* Avatar */}
            <div className="flex-shrink-0">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  isUser ? "bg-blue-500 text-white" : "bg-green-500 text-white"
                }`}
              >
                {isUser ? (
                  <User className="w-4 h-4" />
                ) : (
                  <Bot className="w-4 h-4" />
                )}
              </div>
            </div>

            {/* Message Content */}
            <div
              className={`flex-1 max-w-[80%] ${isUser ? "items-end" : "items-start"} flex flex-col`}
            >
              {/* Message Header */}
              <div
                className={`flex items-center gap-2 mb-1 ${isUser ? "flex-row-reverse" : "flex-row"}`}
              >
                <span className="text-xs font-medium text-gray-600">
                  {isUser ? "You" : message.agentName || "Assistant"}
                </span>
                <span className="text-xs text-gray-400">
                  {formatTime(message._creationTime)}
                </span>
                {message.model && (
                  <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full border">
                    {message.model}
                  </span>
                )}
              </div>

              {/* Message Bubble */}
              <div
                className={`
                  relative p-3 rounded-2xl max-w-full break-words
                  ${
                    isUser
                      ? "bg-gradient-to-br from-blue-600 to-blue-500 text-white shadow-lg shadow-blue-500/25"
                      : "bg-white border border-gray-200 text-gray-800 shadow-sm"
                  }
                  transition-all duration-200 ease-in-out
                  group-hover:shadow-lg
                  ${message.streaming ? "animate-pulse" : ""}
                `}
              >
                {/* Message Text */}
                <div className="leading-relaxed whitespace-pre-wrap">
                  {content}
                </div>

                {/* Streaming Indicator */}
                {message.streaming && (
                  <div className="flex items-center gap-1 mt-2 text-xs opacity-70">
                    <div className="flex gap-1">
                      <div className="w-1 h-1 bg-current rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                      <div className="w-1 h-1 bg-current rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                      <div className="w-1 h-1 bg-current rounded-full animate-bounce"></div>
                    </div>
                    <span>AI is typing...</span>
                  </div>
                )}

                {/* Message Tail */}
                <div
                  className={`
                    absolute top-3 w-3 h-3 rotate-45
                    ${
                      isUser
                        ? "right-[-6px] bg-gradient-to-br from-blue-600 to-blue-500"
                        : "left-[-6px] bg-white border-l border-t border-gray-200"
                    }
                  `}
                />
              </div>

              {/* Message Footer */}
              <div
                className={`flex items-center gap-1 mt-1 ${isUser ? "flex-row-reverse" : "flex-row"}`}
              >
                {getStatusIcon(message.status, message.streaming)}
                {message.finishReason && (
                  <span className="text-xs text-gray-400">
                    {message.finishReason}
                  </span>
                )}
              </div>
            </div>
          </div>
        );
      })}

      {/* Loading Indicator */}
      {isLoading && (
        <div className="flex gap-3">
          <div className="flex-shrink-0">
            <div className="w-8 h-8 rounded-full flex items-center justify-center bg-green-500 text-white">
              <Bot className="w-4 h-4" />
            </div>
          </div>
          <div className="flex-1">
            <div className="bg-white border border-gray-200 rounded-2xl p-3 shadow-sm">
              <div className="flex items-center gap-2">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                </div>
                <span className="text-sm text-gray-500">AI is thinking...</span>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="text-center">
        {resolvedMessage && (
          <>
            <p className="text-sm text-gray-500 italic">{resolvedMessage}</p>
          </>
        )}
      </div>
    </div>
  );
};
