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

      {/* Delete Button - Top Right Corner */}
      {removePlugin && (
        <div className="absolute top-4 right-4 z-20">
          <button
            onClick={handleRemove}
            disabled={isDeleting || isLoading}
            className="group/delete relative w-10 h-10 rounded-xl bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 hover:border-red-400 dark:hover:border-red-500 shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
            title="Remove plugin"
          >
            {/* Hover background effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-red-50 to-red-100 dark:from-red-950/30 dark:to-red-900/40 opacity-0 group-hover/delete:opacity-100 transition-opacity duration-200" />

            {/* Icon */}
            <div className="relative w-full h-full flex items-center justify-center">
              {isDeleting ? (
                <Loader2 className="w-5 h-5 text-red-600 dark:text-red-400 animate-spin" />
              ) : (
                <Trash2 className="w-5 h-5 text-slate-600 dark:text-slate-400 group-hover/delete:text-red-600 dark:group-hover/delete:text-red-400 group-hover/delete:scale-110 transition-all duration-200" />
              )}
            </div>

            {/* Ripple effect on hover */}
            <div className="absolute inset-0 rounded-xl opacity-0 group-hover/delete:opacity-100 transition-opacity duration-300">
              <div className="absolute inset-0 rounded-xl bg-red-400/20 dark:bg-red-500/20 animate-pulse" />
            </div>
          </button>
        </div>
      )}

      <div className="relative p-6 md:p-8">
        {/* Header Section */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-3">
            <div
              className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradient.from} ${gradient.to} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}
            >
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                {title}
              </h3>
              {description && (
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                  {description}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Messages Section */}
        <div className="space-y-4 mb-8">
          {messages.map((msg, index) => {
            const Icon = msg.icon;
            return (
              <div
                key={index}
                className="flex items-start gap-4 p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-200 group/item"
              >
                <div
                  className={`flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br ${gradient.from} ${gradient.to} flex items-center justify-center shadow-md opacity-90 group-hover/item:opacity-100 group-hover/item:scale-110 transition-all duration-200`}
                >
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 pt-1">
                  <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                    {msg.message}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Button */}
        <div className="w-full">
          <Button
            onClick={handleTrigger}
            disabled={disabled || isLoading}
            className={`w-full group/btn relative overflow-hidden bg-gradient-to-r ${gradient.from} ${gradient.to} hover:shadow-xl hover:scale-105 transition-all duration-300 text-white px-8 py-6 text-base font-semibold rounded-xl border-0`}
          >
            {/* Button shine effect */}
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover/btn:opacity-20 group-hover/btn:translate-x-full transition-all duration-700 -translate-x-full" />

            <span className="relative flex items-center justify-center gap-2">
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  {buttonText}
                  <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform duration-300" />
                </>
              )}
            </span>
          </Button>
        </div>

        {/* Bottom decorative line */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
    </Card>
  );
};

export default PluginCard;
