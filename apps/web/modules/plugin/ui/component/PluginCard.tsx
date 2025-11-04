"use client";

import React, { useState } from "react";
import {
  LucideIcon,
  Sparkles,
  ArrowRight,
  Loader2,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface Message {
  icon: LucideIcon;
  message: string;
}

interface PluginCardProps {
  title?: string;
  description?: string;
  messages: Message[];
  onServiceTrigger: () => void | Promise<void>;
  removePlugin?: () => void | Promise<void>;
  buttonText?: string;
  gradient?: {
    from: string;
    to: string;
  };
  disabled?: boolean;
}

const PluginCard: React.FC<PluginCardProps> = ({
  title = "Plugin Service",
  description,
  messages,
  onServiceTrigger,
  removePlugin,
  buttonText = "Trigger Service",
  gradient = { from: "from-blue-500", to: "to-blue-600" },
  disabled = false,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleTrigger = async () => {
    setIsLoading(true);
    try {
      await onServiceTrigger();
    } catch (error) {
      console.error("Service trigger failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemove = async () => {
    if (!removePlugin) return;
    setIsDeleting(true);
    try {
      await removePlugin();
    } catch (error) {
      console.error("Plugin removal failed:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Card className="group relative overflow-hidden border-0 bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-800 shadow-lg hover:shadow-2xl transition-all duration-300">
      {/* Decorative background gradient */}
      <div
        className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-br ${gradient.from} ${gradient.to} opacity-5 blur-3xl rounded-full transform translate-x-20 -translate-y-20 group-hover:opacity-10 transition-opacity duration-500`}
      />

      <div className="relative p-4 sm:p-5 md:p-6">
        {/* Responsive Layout - Stack on mobile, row on desktop */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4 sm:gap-5 lg:gap-6">
          {/* Left: Icon + Title */}
          <div className="flex items-center gap-3 sm:gap-4 min-w-0 flex-shrink-0 w-full lg:w-auto">
            <div
              className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br ${gradient.from} ${gradient.to} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 flex-shrink-0`}
            >
              <Sparkles className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white truncate">
                {title}
              </h3>
              {description && (
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 truncate">
                  {description}
                </p>
              )}
            </div>
          </div>

          {/* Middle: Messages - Horizontal Badges, scrollable on mobile */}
          <div className="flex items-center gap-2 flex-1 min-w-0 overflow-x-auto scrollbar-hide w-full lg:w-auto">
            {messages.map((msg, index) => {
              const Icon = msg.icon;
              return (
                <div
                  key={index}
                  className="group/badge relative flex items-center gap-2 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-200 flex-shrink-0"
                  title={msg.message}
                >
                  <div
                    className={`w-5 h-5 sm:w-6 sm:h-6 rounded-md bg-gradient-to-br ${gradient.from} ${gradient.to} flex items-center justify-center opacity-90 group-hover/badge:opacity-100 transition-all duration-200 flex-shrink-0`}
                  >
                    <Icon className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-white" />
                  </div>
                  <span className="text-xs font-medium text-slate-700 dark:text-slate-300 whitespace-nowrap">
                    {msg.message.split(" ").slice(0, 3).join(" ")}...
                  </span>
                </div>
              );
            })}
          </div>

          {/* Right: Action Button - Full width on mobile */}
          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0 w-full lg:w-auto">
            <Button
              onClick={handleTrigger}
              disabled={disabled || isLoading}
              className={`group/btn relative overflow-hidden bg-gradient-to-r ${gradient.from} ${gradient.to} hover:shadow-lg transition-all duration-300 text-white px-4 sm:px-6 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold rounded-lg border-0 flex-1 lg:flex-initial`}
            >
              {/* Button shine effect */}
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover/btn:opacity-20 group-hover/btn:translate-x-full transition-all duration-700 -translate-x-full" />

              <span className="relative flex items-center justify-center gap-2 whitespace-nowrap">
                {isLoading ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 animate-spin" />
                    <span className="hidden sm:inline">Processing...</span>
                    <span className="sm:hidden">...</span>
                  </>
                ) : (
                  <>
                    {buttonText}
                    <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                  </>
                )}
              </span>
            </Button>

            {/* Delete Button - Right End */}
            {removePlugin && (
              <button
                onClick={handleRemove}
                disabled={isDeleting || isLoading}
                className="group/delete relative w-10 h-10 rounded-lg bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 hover:border-red-400 dark:hover:border-red-500 shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden flex-shrink-0"
                title="Remove plugin"
              >
                {/* Hover background effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-red-50 to-red-100 dark:from-red-950/30 dark:to-red-900/40 opacity-0 group-hover/delete:opacity-100 transition-opacity duration-200" />

                {/* Icon */}
                <div className="relative w-full h-full flex items-center justify-center">
                  {isDeleting ? (
                    <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 text-red-600 dark:text-red-400 animate-spin" />
                  ) : (
                    <Trash2 className="w-4 h-4 sm:w-5 sm:h-5 text-slate-600 dark:text-slate-400 group-hover/delete:text-red-600 dark:group-hover/delete:text-red-400 group-hover/delete:scale-110 transition-all duration-200" />
                  )}
                </div>

                {/* Ripple effect on hover */}
                <div className="absolute inset-0 rounded-lg opacity-0 group-hover/delete:opacity-100 transition-opacity duration-300">
                  <div className="absolute inset-0 rounded-lg bg-red-400/20 dark:bg-red-500/20 animate-pulse" />
                </div>
              </button>
            )}
          </div>
        </div>

        {/* Bottom decorative line */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
    </Card>
  );
};

export default PluginCard;
