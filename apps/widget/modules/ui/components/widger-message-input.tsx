"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

// Zod Schema for message validation
const messageSchema = z.object({
  message: z
    .string()
    .min(1, "Message cannot be empty")
    .max(2000, "Message is too long (max 2000 characters)")
    .trim(),
});

type MessageFormData = z.infer<typeof messageSchema>;

interface ChatInputProps {
  onSubmit: (message: string) => Promise<void>;
  disabled?: boolean;
  placeholder?: string;
  className?: string;
}

export const WidgetMessageInput = ({
  onSubmit,
  disabled = false,
  placeholder = "Type your message...",
  className = "",
}: ChatInputProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    watch,
  } = useForm<MessageFormData>({
    resolver: zodResolver(messageSchema),
    mode: "onChange",
    defaultValues: {
      message: "",
    },
  });

  const messageValue = watch("message");

  const handleFormSubmit = async (data: MessageFormData) => {
    if (!data.message.trim() || isSubmitting) return;

    setIsSubmitting(true);
    try {
      await onSubmit(data.message.trim());
      reset();
    } catch (error) {
      console.error("Failed to send message:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(handleFormSubmit)();
    }
  };

  const isMessageValid = isValid && messageValue?.trim().length > 0;

  return (
    <div
      className={`border-t border-gray-200/50 bg-white/95 backdrop-blur-xl ${className}`}
    >
      {/* Main input area */}
      <form onSubmit={handleSubmit(handleFormSubmit)} className="p-4">
        <div className="flex items-end gap-3">
          {/* Message input */}
          <div className="flex-1 relative">
            <Textarea
              {...register("message")}
              placeholder={placeholder}
              disabled={disabled || isSubmitting}
              onKeyDown={handleKeyDown}
              className={`
                min-h-[44px] max-h-32 resize-none rounded-2xl border-2
                ${
                  errors.message
                    ? "border-red-300 focus:border-red-500"
                    : "border-gray-200 focus:border-blue-400"
                }
                bg-gray-50/50 backdrop-blur-sm
                transition-all duration-200 ease-in-out
                focus:bg-white focus:shadow-lg focus:shadow-blue-500/10
                placeholder:text-gray-400
              `}
              rows={1}
            />
          </div>

          {/* Send button */}
          <Button
            type="submit"
            disabled={!isMessageValid || disabled || isSubmitting}
            className={`h-11 w-11 rounded-xl transition-all duration-200 ${
              isMessageValid && !disabled && !isSubmitting
                ? "bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 shadow-lg shadow-blue-500/25 scale-100 hover:scale-105"
                : "bg-gray-300 text-gray-500 cursor-not-allowed scale-95"
            }`}
          >
            {isSubmitting ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <Send className="h-4 w-4 text-white" />
            )}
          </Button>
        </div>

        {/* Error message */}
        {errors.message && (
          <div className="mt-2 text-sm text-red-500 flex items-center gap-1">
            <div className="w-1 h-1 bg-red-500 rounded-full" />
            {errors.message.message}
          </div>
        )}

        {/* Helper text */}
        <div className="mt-2 text-xs text-gray-500">
          Press Enter to send, Shift+Enter for new line
        </div>
      </form>
    </div>
  );
};
