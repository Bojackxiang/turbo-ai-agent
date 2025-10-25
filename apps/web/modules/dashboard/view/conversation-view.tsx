"use client";

import { api } from "@repo/backend/convex/_generated/api";
import { Id } from "@repo/backend/convex/_generated/dataModel";
import { useAction, useMutation, useQuery } from "convex/react";
import { useEffect, useRef, useState } from "react";
import { useThreadMessages } from "@convex-dev/agent/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Bot,
  User,
  Send,
  Loader2,
  MessageCircle,
  Sparkles,
  Clock,
  CheckCircle2,
  AlertCircle,
  XCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";

// Message form schema
const messageSchema = z.object({
  message: z
    .string()
    .min(1, "Message cannot be empty")
    .max(1000, "Message too long (max 1000 characters)")
    .trim(),
});

type MessageFormData = z.infer<typeof messageSchema>;

// Message type from your actual data structure

interface ConversationIdViewProps {
  conversationId: Id<"conversation">;
}

const ConversationIdView: React.FC<ConversationIdViewProps> = ({
  conversationId,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const conversation = useQuery(api.private.conversation.getOne, {
    conversationId: conversationId,
  });

  const updateConversationStatus = useMutation(
    api.private.conversation.updateStatus
  );

  const createMessage = useAction(api.private.message.create);

  const messages = useThreadMessages(
    api.private.conversation.getMany,
    conversation?.threadId ? { threadId: conversation.threadId } : "skip",
    { initialNumItems: 10 }
  );

  // Form setup with React Hook Form + Zod
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isValid },
  } = useForm<MessageFormData>({
    resolver: zodResolver(messageSchema),
    mode: "onChange",
  });

  const watchedMessage = watch("message", "");

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.results]);

  const handleAddMessage = async (data: MessageFormData) => {
    if (!conversationId || !conversation?.threadId) {
      throw new Error("Missing required data to send message");
    }

    setIsSubmitting(true);
    try {
      await createMessage({
        threadId: conversation.threadId,
        prompt: data.message,
      });
      reset();
    } catch (error) {
      console.error("Failed to send message:", error);
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && e.ctrlKey) {
      e.preventDefault();
      const messageValue = watchedMessage.trim();
      if (messageValue && !isSubmitting && isValid) {
        handleSubmit(handleAddMessage)();
      }
    }
  };

  const handleLoadMoreMessage = async () => {
    messages.loadMore(10);
  };

  const getMessageText = (message: any): string => {
    if (message.text) {
      return message.text;
    }

    // Then try message.content
    if (message.message?.content) {
      if (typeof message.message.content === "string") {
        return message.message.content;
      }
      if (Array.isArray(message.message.content)) {
        return message.message.content
          .filter((item: any) => item.type === "text" && item.text)
          .map((item: any) => item.text)
          .join("");
      }
    }

    return "No content";
  };

  const getMessageRole = (message: any): "user" | "assistant" => {
    if (message.message?.role) {
      return message.message.role;
    }
    if (message.role) {
      return message.role;
    }
    // Default fallback based on other indicators
    return message.agentName ? "assistant" : "user";
  };

  const formatTime = (timestamp: number): string => {
    return new Date(timestamp).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const MessageBubble: React.FC<{ message: any }> = ({ message }) => {
    const isAssistant = getMessageRole(message) === "assistant";
    const messageText = getMessageText(message);

    return (
      <div
        className={`flex gap-3 mb-6 ${isAssistant ? "justify-start" : "justify-end"}`}
      >
        {isAssistant && (
          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg">
            <Bot className="w-4 h-4 text-white" />
          </div>
        )}

        <div
          className={`group max-w-[80%] ${isAssistant ? "order-1" : "order-2"}`}
        >
          {/* Message header */}
          <div
            className={`flex items-center gap-2 mb-1 ${isAssistant ? "justify-start" : "justify-end"}`}
          >
            <span className="text-xs font-medium text-slate-600">
              {isAssistant ? message.agentName || "AI Assistant" : "You"}
            </span>
            <span className="text-xs text-slate-400 flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {formatTime(message._creationTime)}
            </span>
            {message.status === "success" && (
              <CheckCircle2 className="w-3 h-3 text-green-500" />
            )}
            {message.status === "failed" && (
              <AlertCircle className="w-3 h-3 text-red-500" />
            )}
          </div>

          {/* Message bubble */}
          <div
            className={`relative px-4 py-3 rounded-2xl shadow-sm transition-all duration-200 group-hover:shadow-md ${
              isAssistant
                ? "bg-white border border-slate-200 text-slate-800 rounded-tl-md"
                : "bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-tr-md"
            }`}
          >
            <p className="text-sm leading-relaxed whitespace-pre-wrap">
              {messageText}
            </p>

            {/* Message metadata for assistant */}
            {isAssistant && message.model && (
              <div className="flex items-center gap-2 mt-2 pt-2 border-t border-slate-100">
                <div className="flex items-center gap-1 text-xs text-slate-500">
                  <Sparkles className="w-3 h-3" />
                  <span>{message.model}</span>
                </div>
                {message.usage && (
                  <div className="text-xs text-slate-400">
                    {message.usage.totalTokens} tokens
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {!isAssistant && (
          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-slate-400 to-slate-500 flex items-center justify-center shadow-lg order-1">
            <User className="w-4 h-4 text-white" />
          </div>
        )}
      </div>
    );
  };

  const onStatusChange = async (
    newStatus: "unresolved" | "escalated" | "resolved"
  ) => {
    if (!conversationId) return;
    await updateConversationStatus({
      conversationId,
      status: newStatus,
    });
  };

  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <div className="flex-shrink-0 px-6 py-4 border-b border-slate-200 bg-white/80 backdrop-blur-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg">
              <MessageCircle className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-slate-800">
                Conversation Chat
              </h2>
              <p className="text-sm text-slate-500">
                ID: {conversationId?.slice(-8)}...
              </p>
            </div>
          </div>

          {/* Status Selector */}
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-slate-600">Status:</span>
            <Select
              value={conversation?.status || "unresolved"}
              onValueChange={(value: "unresolved" | "escalated" | "resolved") =>
                onStatusChange(value)
              }
            >
              <SelectTrigger className="w-32 h-8 border-slate-200 focus:ring-blue-500/20 focus:border-blue-500">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="unresolved">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-orange-400"></div>
                    <span>Unresolved</span>
                  </div>
                </SelectItem>
                <SelectItem value="escalated">
                  <div className="flex items-center gap-2">
                    <XCircle className="w-3 h-3 text-red-500" />
                    <span>Escalated</span>
                  </div>
                </SelectItem>
                <SelectItem value="resolved">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3 h-3 text-green-500" />
                    <span>Resolved</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 min-h-0">
        <ScrollArea className="h-full px-6 py-4">
          <div className="space-y-1">
            {/* Load more button */}
            {messages.status === "CanLoadMore" && (
              <div className="text-center mb-6">
                <Button
                  onClick={handleLoadMoreMessage}
                  variant="outline"
                  size="sm"
                  className="text-slate-600 hover:text-slate-800"
                >
                  Load earlier messages
                </Button>
              </div>
            )}

            {/* Messages */}
            {messages.results
              ?.filter((message: any) => {
                // 过滤掉空消息
                const text = getMessageText(message);
                return text && text.trim().length > 0 && text !== "No content";
              })
              ?.map((message: any) => (
                <MessageBubble key={message._id} message={message} />
              ))}

            {/* Loading indicator */}
            {isSubmitting && (
              <div className="flex justify-start gap-3 mb-6">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div className="bg-white border border-slate-200 rounded-2xl rounded-tl-md px-4 py-3 shadow-sm">
                  <div className="flex items-center gap-2 text-slate-500">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span className="text-sm">AI is thinking...</span>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>
      </div>

      {/* Message Input */}
      <div className="flex-shrink-0 p-6 border-t border-slate-200 bg-white/80 backdrop-blur-sm">
        <form onSubmit={handleSubmit(handleAddMessage)} className="space-y-3">
          <div className="relative">
            <Textarea
              {...register("message")}
              placeholder="Type your message here... (Ctrl+Enter to send)"
              onKeyDown={handleKeyDown}
              className={`resize-none pr-12 rounded-xl border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 ${
                errors.message ? "border-red-300 focus:border-red-500" : ""
              }`}
              rows={2}
              disabled={
                isSubmitting ||
                ["resolved", "escalated"].includes(conversation?.status || "")
              }
            />

            {/* Send button */}
            <Button
              type="submit"
              size="sm"
              disabled={!isValid || isSubmitting || !watchedMessage.trim()}
              className="absolute bottom-2 right-2 h-8 w-8 p-0 rounded-full bg-blue-500 hover:bg-blue-600 disabled:opacity-50"
            >
              {isSubmitting ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )}
            </Button>
          </div>

          {/* Character count and error */}
          <div className="flex justify-between items-center text-xs">
            <div className="text-slate-500">
              {watchedMessage.length}/1000 characters
            </div>
            {errors.message && (
              <div className="text-red-500 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                {errors.message.message}
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default ConversationIdView;
