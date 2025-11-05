"use client";

import { api } from "@repo/backend/convex/_generated/api";
import { useMutation } from "convex/react";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  MessageSquare,
  Sparkles,
  Phone,
  Bot,
  Loader2,
  Save,
} from "lucide-react";

// Define the form schema
const widgetSettingsSchema = z.object({
  greetingMessage: z
    .string()
    .min(1, "Greeting message is required")
    .max(200, "Greeting message is too long"),
  suggestions1: z.string().optional(),
  suggestions2: z.string().optional(),
  suggestions3: z.string().optional(),
  assistantId: z.string().optional(),
  phoneNumber: z.string().optional(),
});

type WidgetSettingsFormData = z.infer<typeof widgetSettingsSchema>;

interface CustomizationFormProps {
  onSubmit: (data: WidgetSettingsFormData) => void | Promise<void>;
  onCancel: () => void;
  defaultValues?: Partial<WidgetSettingsFormData>;
}

const CustomizationForm: React.FC<CustomizationFormProps> = ({
  onSubmit,
  onCancel,
  defaultValues,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<WidgetSettingsFormData>({
    resolver: zodResolver(widgetSettingsSchema),
    defaultValues: defaultValues || {
      greetingMessage: "",
      suggestions1: "",
      suggestions2: "",
      suggestions3: "",
      assistantId: "",
      phoneNumber: "",
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Greeting Message Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
            <MessageSquare className="w-4 h-4 text-white" />
          </div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
            Greeting Message
          </h3>
        </div>

        <div className="space-y-2">
          <label
            htmlFor="greetingMessage"
            className="text-sm font-medium text-slate-700 dark:text-slate-300"
          >
            Welcome Message <span className="text-red-500">*</span>
          </label>
          <Input
            id="greetingMessage"
            {...register("greetingMessage")}
            placeholder="e.g., Welcome to our support chat!"
            className="w-full rounded-lg border-slate-300 dark:border-slate-700 focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.greetingMessage && (
            <p className="text-sm text-red-600 dark:text-red-400">
              {errors.greetingMessage.message}
            </p>
          )}
        </div>
      </div>

      {/* Divider */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-slate-200 dark:border-slate-700" />
        </div>
        <div className="relative flex justify-center">
          <span className="bg-white dark:bg-slate-900 px-3 text-sm text-slate-500 dark:text-slate-400">
            Quick Suggestions
          </span>
        </div>
      </div>

      {/* Quick Suggestions Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
            Default Messages
          </h3>
        </div>

        <div className="grid grid-cols-1 gap-4">
          <div className="space-y-2">
            <label
              htmlFor="suggestions1"
              className="text-sm font-medium text-slate-700 dark:text-slate-300"
            >
              Suggestion 1
            </label>
            <Input
              id="suggestions1"
              {...register("suggestions1")}
              placeholder="e.g., How can I help you?"
              className="w-full rounded-lg border-slate-300 dark:border-slate-700 focus:border-purple-500 focus:ring-purple-500"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="suggestions2"
              className="text-sm font-medium text-slate-700 dark:text-slate-300"
            >
              Suggestion 2
            </label>
            <Input
              id="suggestions2"
              {...register("suggestions2")}
              placeholder="e.g., Track my order"
              className="w-full rounded-lg border-slate-300 dark:border-slate-700 focus:border-purple-500 focus:ring-purple-500"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="suggestions3"
              className="text-sm font-medium text-slate-700 dark:text-slate-300"
            >
              Suggestion 3
            </label>
            <Input
              id="suggestions3"
              {...register("suggestions3")}
              placeholder="e.g., Contact support"
              className="w-full rounded-lg border-slate-300 dark:border-slate-700 focus:border-purple-500 focus:ring-purple-500"
            />
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-slate-200 dark:border-slate-700" />
        </div>
        <div className="relative flex justify-center">
          <span className="bg-white dark:bg-slate-900 px-3 text-sm text-slate-500 dark:text-slate-400">
            VAPI Configuration
          </span>
        </div>
      </div>

      {/* VAPI Settings Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center">
            <Phone className="w-4 h-4 text-white" />
          </div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
            VAPI Integration
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label
              htmlFor="assistantId"
              className="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2"
            >
              <Bot className="w-4 h-4 text-green-600 dark:text-green-400" />
              Assistant ID
            </label>
            <Input
              id="assistantId"
              {...register("assistantId")}
              placeholder="e.g., asst_123456"
              className="w-full rounded-lg border-slate-300 dark:border-slate-700 focus:border-green-500 focus:ring-green-500"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="phoneNumber"
              className="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2"
            >
              <Phone className="w-4 h-4 text-green-600 dark:text-green-400" />
              Phone Number
            </label>
            <Input
              id="phoneNumber"
              {...register("phoneNumber")}
              placeholder="e.g., +1234567890"
              className="w-full rounded-lg border-slate-300 dark:border-slate-700 focus:border-green-500 focus:ring-green-500"
            />
          </div>
        </div>
      </div>

      {/* Form Actions */}
      <div className="flex flex-col-reverse sm:flex-row gap-3 pt-6 border-t border-slate-200 dark:border-slate-700">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isSubmitting}
          className="flex-1 sm:flex-initial rounded-lg border-2 hover:bg-slate-50 hover:text-gray-600 dark:hover:bg-slate-800 transition-colors"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={isSubmitting}
          className="flex-1 sm:flex-initial bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="w-4 h-4 mr-2" />
              Save Settings
            </>
          )}
        </Button>
      </div>
    </form>
  );
};

export default CustomizationForm;
