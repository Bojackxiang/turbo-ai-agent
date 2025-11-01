"use client";

import React, { useState } from "react";
import { LucideIcon, Sparkles, ArrowRight, Loader2 } from "lucide-react";
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
  buttonText = "Trigger Service",
  gradient = { from: "from-blue-500", to: "to-blue-600" },
  disabled = false,
}) => {
  const [isLoading, setIsLoading] = useState(false);

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

  return (
    <Card className="group relative overflow-hidden border-0 bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-800 shadow-lg hover:shadow-2xl transition-all duration-300">
      {/* Decorative background gradient */}
      <div
        className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-br ${gradient.from} ${gradient.to} opacity-5 blur-3xl rounded-full transform translate-x-20 -translate-y-20 group-hover:opacity-10 transition-opacity duration-500`}
      />

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
