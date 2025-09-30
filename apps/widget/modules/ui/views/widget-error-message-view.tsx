import React from "react";
import {
  AlertTriangle,
  RefreshCw,
  Home,
  ArrowLeft,
  ExternalLink,
} from "lucide-react";

interface WidgetErrorMessageViewProps {
  message?: string;
  title?: string;
  errorCode?: string;
  errorType?: "network" | "server" | "client" | "unknown";
  onRetry?: () => void;
  onGoHome?: () => void;
  onGoBack?: () => void;
  onContactSupport?: () => void;
  showActions?: boolean;
  className?: string;
}

const WidgetErrorMessageView = ({
  message = "Something went wrong. Please try again.",
  title = "Oops! An error occurred",
  errorCode,
  errorType = "unknown",
  onRetry,
  onGoHome,
  onGoBack,
  onContactSupport,
  showActions = true,
  className = "",
}: WidgetErrorMessageViewProps) => {
  // Get error-specific styling
  const getErrorStyling = (type: string) => {
    switch (type) {
      case "network":
        return {
          iconBg: "bg-gradient-to-br from-orange-400 via-orange-500 to-red-500",
          iconShadow: "shadow-orange-500/30",
          pulseBg: "bg-orange-400",
          badgeBg: "bg-orange-100 text-orange-700",
        };
      case "server":
        return {
          iconBg: "bg-gradient-to-br from-red-400 via-red-500 to-red-600",
          iconShadow: "shadow-red-500/30",
          pulseBg: "bg-red-400",
          badgeBg: "bg-red-100 text-red-700",
        };
      case "client":
        return {
          iconBg:
            "bg-gradient-to-br from-yellow-400 via-yellow-500 to-orange-500",
          iconShadow: "shadow-yellow-500/30",
          pulseBg: "bg-yellow-400",
          badgeBg: "bg-yellow-100 text-yellow-700",
        };
      default:
        return {
          iconBg: "bg-gradient-to-br from-gray-400 via-gray-500 to-gray-600",
          iconShadow: "shadow-gray-500/30",
          pulseBg: "bg-gray-400",
          badgeBg: "bg-gray-100 text-gray-700",
        };
    }
  };

  const styling = getErrorStyling(errorType);

  return (
    <div className={`h-full flex items-center justify-center p-6 ${className}`}>
      <div className="w-full max-w-md mx-auto">
        {/* Error Icon with Modern Design */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            {/* Main icon container with gradient */}
            <div
              className={`w-20 h-20 rounded-2xl ${styling.iconBg} shadow-lg ${styling.iconShadow}
                           flex items-center justify-center transform rotate-3 hover:rotate-0
                           transition-transform duration-300 ease-out`}
            >
              <AlertTriangle className="w-10 h-10 text-white stroke-2" />
            </div>

            {/* Animated pulse ring */}
            <div
              className={`absolute inset-0 w-20 h-20 rounded-2xl ${styling.pulseBg}
                           animate-ping opacity-20`}
            ></div>

            {/* Decorative elements */}
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-white rounded-full shadow-md"></div>
            <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-white/80 rounded-full"></div>
          </div>
        </div>

        {/* Error Content */}
        <div className="text-center space-y-4 mb-8">
          {/* Title with modern typography */}
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight leading-tight">
            {title}
          </h1>

          {/* Error Code Badge */}
          {errorCode && (
            <div
              className={`inline-flex items-center px-3 py-1.5 rounded-full ${styling.badgeBg}
                           text-xs font-semibold tracking-wide uppercase`}
            >
              Error {errorCode}
            </div>
          )}

          {/* Message with improved readability */}
          <p className="text-gray-600 text-base leading-relaxed max-w-sm mx-auto">
            {message}
          </p>
        </div>

        {/* Action Buttons */}
        {showActions && (
          <div className="space-y-3">
            {/* Primary Action - Retry */}
            {onRetry && (
              <button
                onClick={onRetry}
                className="w-full group flex items-center justify-center gap-3 px-6 py-3.5
                         bg-gradient-to-r from-blue-600 to-blue-700
                         hover:from-blue-700 hover:to-blue-800
                         text-white font-semibold rounded-2xl
                         shadow-lg shadow-blue-500/25
                         hover:shadow-xl hover:shadow-blue-500/40
                         transform hover:scale-[1.02] active:scale-[0.98]
                         transition-all duration-300 ease-out
                         focus:outline-none focus:ring-4 focus:ring-blue-500/20"
              >
                <RefreshCw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
                Try Again
              </button>
            )}

            {/* Secondary Actions */}
            <div className="flex gap-3">
              {onGoBack && (
                <button
                  onClick={onGoBack}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3
                           bg-white hover:bg-gray-50
                           text-gray-700 font-medium rounded-xl
                           border border-gray-200 hover:border-gray-300
                           shadow-sm hover:shadow-md
                           transform hover:scale-[1.02] active:scale-[0.98]
                           transition-all duration-200 ease-out
                           focus:outline-none focus:ring-4 focus:ring-gray-500/10"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </button>
              )}

              {onGoHome && (
                <button
                  onClick={onGoHome}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3
                           bg-white hover:bg-gray-50
                           text-gray-700 font-medium rounded-xl
                           border border-gray-200 hover:border-gray-300
                           shadow-sm hover:shadow-md
                           transform hover:scale-[1.02] active:scale-[0.98]
                           transition-all duration-200 ease-out
                           focus:outline-none focus:ring-4 focus:ring-gray-500/10"
                >
                  <Home className="w-4 h-4" />
                  Home
                </button>
              )}
            </div>

            {/* Support Link */}
            {onContactSupport && (
              <button
                onClick={onContactSupport}
                className="w-full flex items-center justify-center gap-2 px-4 py-3
                         bg-gray-50 hover:bg-gray-100
                         text-gray-600 hover:text-gray-700
                         font-medium rounded-xl
                         border border-gray-100 hover:border-gray-200
                         transition-all duration-200 ease-out
                         focus:outline-none focus:ring-4 focus:ring-gray-500/10"
              >
                <ExternalLink className="w-4 h-4" />
                Contact Support
              </button>
            )}
          </div>
        )}

        {/* Footer help text */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500 leading-relaxed">
            If the problem persists, please try refreshing the page or contact
            our support team
          </p>
        </div>
      </div>
    </div>
  );
};

export default WidgetErrorMessageView;
