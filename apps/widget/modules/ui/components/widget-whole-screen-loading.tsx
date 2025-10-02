import React from "react";
import { Loader2 } from "lucide-react";

interface WidgetFullHeightLoadingProps {
  message?: string;
  subMessage?: string;
  showProgress?: boolean;
  progress?: number; // 0-100
}

export const WidgetFullHightLoading = ({
  message = "Processing...",
  subMessage = "Please wait while we prepare everything for you",
  showProgress = false,
  progress = 0,
}: WidgetFullHeightLoadingProps) => {
  return (
    <div
      className="absolute inset-0 z-50 flex items-center justify-center
                    bg-white/95 backdrop-blur-sm"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-r
                       from-blue-400/10 to-purple-400/10 rounded-full blur-3xl animate-pulse"
        ></div>
        <div
          className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-gradient-to-r
                       from-purple-400/10 to-pink-400/10 rounded-full blur-2xl
                       animate-pulse animation-delay-100"
        ></div>
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
                       w-40 h-40 bg-gradient-to-r from-indigo-400/5 to-blue-400/5
                       rounded-full blur-3xl animate-pulse animation-delay-200"
        ></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center max-w-sm mx-auto px-6">
        {/* Loading Icon */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            {/* Main spinner */}
            <div
              className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-blue-600
                           shadow-lg shadow-indigo-500/30 flex items-center justify-center"
            >
              <Loader2 className="w-8 h-8 text-white animate-spin" />
            </div>

            {/* Pulse rings */}
            <div
              className="absolute inset-0 w-16 h-16 rounded-2xl bg-indigo-400
                           animate-ping opacity-20"
            ></div>
            <div
              className="absolute inset-0 w-16 h-16 rounded-2xl bg-indigo-400
                           animate-ping opacity-10 animation-delay-75"
            ></div>
          </div>
        </div>

        {/* Text Content */}
        <div className="space-y-3 mb-6">
          <h3 className="text-lg font-semibold text-gray-900">{message}</h3>
          <p className="text-sm text-gray-600 leading-relaxed">{subMessage}</p>
        </div>

        {/* Progress Bar (Optional) */}
        {showProgress && (
          <div className="space-y-2">
            <div className="w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-indigo-500 to-blue-600
                         transition-all duration-500 ease-out rounded-full"
                style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
              ></div>
            </div>
            <div className="text-xs text-gray-500">
              {Math.round(progress)}% complete
            </div>
          </div>
        )}

        {/* Loading Dots */}
        <div className="flex justify-center items-center space-x-1 mt-6">
          <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce animation-delay-75"></div>
          <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce animation-delay-150"></div>
        </div>
      </div>
    </div>
  );
};
