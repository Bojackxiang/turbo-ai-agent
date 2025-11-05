"use client";

import { Card } from "@/components/ui/card";
import {
  MessageSquare,
  Sparkles,
  Phone,
  Bot,
  Edit,
  Trash2,
} from "lucide-react";

interface WidgetSettings {
  greetingMessage: string;
  defaultMessages: {
    suggestions1?: string;
    suggestions2?: string;
    suggestions3?: string;
  };
  vapiSettings: {
    assistantId?: string;
    phoneNumber?: string;
  };
}

interface SettingCardProps {
  settings: WidgetSettings;
  onEdit: () => void;
  onDelete?: () => void;
}

const SettingCard: React.FC<SettingCardProps> = ({
  settings,
  onEdit,
  onDelete,
}) => {
  return (
    <Card className="group relative overflow-hidden border-0 bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-800 shadow-lg hover:shadow-xl transition-all duration-300">
      {/* Decorative gradient */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-500 to-blue-500 opacity-5 blur-3xl rounded-full transform translate-x-16 -translate-y-16 group-hover:opacity-10 transition-opacity duration-500" />

      <div className="relative p-4 sm:p-6 md:p-8">
        {/* Card Header */}
        <div className="flex items-start justify-between mb-6 gap-4">
          <div className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center shadow-lg flex-shrink-0">
              <MessageSquare className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                Widget Configuration
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                Active settings for your chat widget
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={onEdit}
              className="group/edit w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 hover:border-blue-400 dark:hover:border-blue-500 shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center"
              title="Edit settings"
            >
              <Edit className="w-4 h-4 sm:w-5 sm:h-5 text-slate-600 dark:text-slate-400 group-hover/edit:text-blue-600 dark:group-hover/edit:text-blue-400 transition-colors" />
            </button>
            {onDelete && (
              <button
                onClick={onDelete}
                className="group/delete w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 hover:border-red-400 dark:hover:border-red-500 shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center"
                title="Delete settings"
              >
                <Trash2 className="w-4 h-4 sm:w-5 sm:h-5 text-slate-600 dark:text-slate-400 group-hover/delete:text-red-600 dark:group-hover/delete:text-red-400 transition-colors" />
              </button>
            )}
          </div>
        </div>

        {/* Greeting Message Section */}
        <div className="mb-6 p-4 sm:p-5 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100/50 dark:from-blue-950/30 dark:to-blue-900/20 border border-blue-200 dark:border-blue-800">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-500 flex items-center justify-center flex-shrink-0">
              <MessageSquare className="w-4 h-4 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-semibold text-blue-900 dark:text-blue-300 mb-1">
                Greeting Message
              </h4>
              <p className="text-sm text-blue-800 dark:text-blue-200">
                {settings.greetingMessage}
              </p>
            </div>
          </div>
        </div>

        {/* Default Messages Section */}
        <div className="mb-6">
          <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-purple-500" />
            Quick Suggestions
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {settings.defaultMessages.suggestions1 && (
              <div className="p-3 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                  {settings.defaultMessages.suggestions1}
                </p>
              </div>
            )}
            {settings.defaultMessages.suggestions2 && (
              <div className="p-3 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                  {settings.defaultMessages.suggestions2}
                </p>
              </div>
            )}
            {settings.defaultMessages.suggestions3 && (
              <div className="p-3 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                  {settings.defaultMessages.suggestions3}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* VAPI Settings Section */}
        <div className="p-4 sm:p-5 rounded-xl bg-gradient-to-br from-purple-50 to-purple-100/50 dark:from-purple-950/30 dark:to-purple-900/20 border border-purple-200 dark:border-purple-800">
          <h4 className="text-sm font-semibold text-purple-900 dark:text-purple-300 mb-4 flex items-center gap-2">
            <Phone className="w-4 h-4" />
            VAPI Configuration
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-purple-500 flex items-center justify-center flex-shrink-0">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs text-purple-700 dark:text-purple-400 mb-0.5">
                  Assistant ID
                </p>
                <p className="text-sm font-medium text-purple-900 dark:text-purple-200 truncate">
                  {settings.vapiSettings.assistantId || "Not set"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-purple-500 flex items-center justify-center flex-shrink-0">
                <Phone className="w-4 h-4 text-white" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs text-purple-700 dark:text-purple-400 mb-0.5">
                  Phone Number
                </p>
                <p className="text-sm font-medium text-purple-900 dark:text-purple-200 truncate">
                  {settings.vapiSettings.phoneNumber || "Not set"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom decorative line */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
    </Card>
  );
};

export default SettingCard;
