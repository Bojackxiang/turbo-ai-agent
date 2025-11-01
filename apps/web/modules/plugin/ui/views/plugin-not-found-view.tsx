"use client";

import React from "react";
import { AlertCircle, Link2Off } from "lucide-react";

interface PluginNotFoundViewProps {
  message?: string;
}

const PluginNotFoundView = ({ message }: PluginNotFoundViewProps) => {
  return (
    <div className="w-full max-w-3xl mx-auto mb-8">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30 border border-amber-200 dark:border-amber-800 p-8">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,rgba(251,191,36,0.3),transparent_50%)]" />
          <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_80%,rgba(249,115,22,0.3),transparent_50%)]" />
        </div>

        {/* Content */}
        <div className="relative z-10">
          <div className="flex items-start gap-4">
            {/* Icon */}
            <div className="flex-shrink-0">
              <div className="relative">
                {/* Pulsing background */}
                <div className="absolute inset-0 bg-amber-500 rounded-full opacity-20 animate-pulse" />
                <div className="relative w-14 h-14 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg">
                  <Link2Off className="w-7 h-7 text-white" />
                </div>
              </div>
            </div>

            {/* Message */}
            <div className="flex-1 pt-1">
              <div className="flex items-center gap-2 mb-2">
                <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                <h3 className="text-lg font-semibold text-amber-900 dark:text-amber-100">
                  Plugin Not Connected
                </h3>
              </div>
              <p className="text-amber-800 dark:text-amber-200 leading-relaxed">
                {message ||
                  "This plugin service is not linked with your organization."}
              </p>
              <p className="text-sm text-amber-700 dark:text-amber-300 mt-3">
                Please configure your plugin credentials below to get started.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PluginNotFoundView;
