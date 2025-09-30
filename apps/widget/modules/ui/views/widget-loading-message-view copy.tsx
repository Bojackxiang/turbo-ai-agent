import React, { use, useEffect, useState } from "react";
import { Loader2, Sparkles, Zap, Wifi } from "lucide-react";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import {
  contactSessionIdAtomFamily,
  errorMessageAtom,
  loadingMessageAtom,
  organizationIdAtom,
  screenAtom,
} from "@/modules/atoms/widget-atoms";
import { useAction, useMutation } from "convex/react";
import { api } from "@repo/backend/convex/_generated/api";
import { Id } from "@repo/backend/convex/_generated/dataModel";

interface WidgetLoadingMessageViewProps {
  message?: string;
  title?: string;
  loadingType?: "default" | "network" | "processing" | "connecting";
  showProgress?: boolean;
  progress?: number; // 0-100
  className?: string;
  orgId: string | null | undefined;
}

type InitSteps = "org" | "session" | "settings" | "vapi" | "done";

const WidgetLoadingMessageView = ({
  message = "Please wait while we load your content...",
  title = "Loading",
  loadingType = "default",
  showProgress = false,
  progress = 0,
  className = "",
  orgId,
}: WidgetLoadingMessageViewProps) => {
  const [step, setStep] = useState<InitSteps>("org");
  const [sessionValid, setSessionValid] = useState<boolean>(false);
  // atom
  const loadingMessage = useAtomValue(loadingMessageAtom);
  const setLoadingMessage = useSetAtom(loadingMessageAtom);
  const setErrorMessage = useSetAtom(errorMessageAtom);
  const organizationId = useAtom(organizationIdAtom);
  const setOrganizationId = useSetAtom(organizationIdAtom);
  const contactSessionId = useAtomValue(
    contactSessionIdAtomFamily(orgId || "")
  );
  const setScreen = useSetAtom(screenAtom);

  // step 1 validate org
  const orgValidation = useAction(api.public.organization.validate);
  useEffect(() => {
    if (step !== "org") {
      return;
    }

    if (!orgId) {
      setErrorMessage("No organization id provided");
      setScreen("error");
      return;
    }

    setLoadingMessage("Validating organization...");

    orgValidation({ orgId })
      .then((res) => {
        if (res.valid) {
          setOrganizationId(orgId);
          setStep("session");
        } else {
          setErrorMessage(
            res.reason || "Unknown error for organization validation"
          );
          setScreen("error");
        }
      })
      .catch((err: unknown) => {
        setErrorMessage(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
        setScreen("error");
      });

    setLoadingMessage("Validating organization...");
  }, [
    step,
    orgId,
    setErrorMessage,
    setScreen,
    loadingMessage,
    orgValidation,
    setLoadingMessage,
    setOrganizationId,
    setStep,
    organizationId,
  ]);

  // step 2 validate session
  const contactSessionValidation = useMutation(
    api.public.contact_session.validation
  );
  useEffect(() => {
    if (step !== "session") {
      return;
    }

    setLoadingMessage("Finding Contact Session ID...");
    if (!contactSessionId) {
      setSessionValid(false);
      setStep("done");
      return;
    }

    contactSessionValidation({
      contactSessionId: contactSessionId,
    })
      .then((res) => {
        if (res.valid) {
          setSessionValid(true);
          setStep("done");
        } else {
          setSessionValid(false);
          setStep("done");
        }
      })
      .catch((err: unknown) => {
        setErrorMessage(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
        setScreen("error");
      });
  }, [step, setLoadingMessage, contactSessionId, contactSessionValidation]);

  // step3
  useEffect(() => {
    if (step !== "done") {
      return;
    }

    const hasValidSession = sessionValid && contactSessionId;
    console.log("contactSessionId: ", contactSessionId);
    console.log("sessionValid: ", sessionValid);
    setScreen(hasValidSession ? "selection" : "auth");
  }, [step, sessionValid, sessionValid, setScreen]);

  const getLoadingStyling = (type: string) => {
    switch (type) {
      case "network":
        return {
          icon: Wifi,
          iconBg: "bg-gradient-to-br from-blue-400 via-blue-500 to-indigo-600",
          iconShadow: "shadow-blue-500/30",
          pulseBg: "bg-blue-400",
          badgeBg: "bg-blue-100 text-blue-700",
          spinnerColor: "text-blue-600",
        };
      case "processing":
        return {
          icon: Zap,
          iconBg:
            "bg-gradient-to-br from-purple-400 via-purple-500 to-pink-500",
          iconShadow: "shadow-purple-500/30",
          pulseBg: "bg-purple-400",
          badgeBg: "bg-purple-100 text-purple-700",
          spinnerColor: "text-purple-600",
        };
      case "connecting":
        return {
          icon: Sparkles,
          iconBg:
            "bg-gradient-to-br from-green-400 via-green-500 to-emerald-500",
          iconShadow: "shadow-green-500/30",
          pulseBg: "bg-green-400",
          badgeBg: "bg-green-100 text-green-700",
          spinnerColor: "text-green-600",
        };
      default:
        return {
          icon: Loader2,
          iconBg:
            "bg-gradient-to-br from-indigo-400 via-indigo-500 to-indigo-600",
          iconShadow: "shadow-indigo-500/30",
          pulseBg: "bg-indigo-400",
          badgeBg: "bg-indigo-100 text-indigo-700",
          spinnerColor: "text-indigo-600",
        };
    }
  };

  const styling = getLoadingStyling(loadingType);
  const IconComponent = styling.icon;

  return (
    <div className={`h-full flex items-center justify-center p-6 ${className}`}>
      <div className="w-full max-w-md mx-auto">
        {/* Loading Icon with Modern Design */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            {/* Main icon container with gradient */}
            <div
              className={`w-20 h-20 rounded-2xl ${styling.iconBg} shadow-lg ${styling.iconShadow}
                           flex items-center justify-center transform
                           transition-transform duration-300 ease-out`}
            >
              <IconComponent
                className={`w-10 h-10 text-white stroke-2 ${
                  loadingType === "default" ? "animate-spin" : ""
                } ${loadingType === "network" ? "animate-pulse" : ""} ${
                  loadingType === "processing" ? "animate-bounce" : ""
                } ${loadingType === "connecting" ? "animate-pulse" : ""}`}
              />
            </div>

            {/* Animated pulse rings */}
            <div
              className={`absolute inset-0 w-20 h-20 rounded-2xl ${styling.pulseBg}
                           animate-ping opacity-20`}
            ></div>
            <div
              className={`absolute inset-0 w-20 h-20 rounded-2xl ${styling.pulseBg}
                           animate-ping opacity-10 animation-delay-75`}
            ></div>

            {/* Decorative floating elements */}
            <div className="absolute -top-2 -right-2 w-4 h-4 bg-white rounded-full shadow-md animate-bounce animation-delay-100"></div>
            <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-white/80 rounded-full animate-bounce animation-delay-200"></div>
            <div className="absolute top-1/2 -right-3 w-2 h-2 bg-white/60 rounded-full animate-pulse"></div>
          </div>
        </div>

        {/* Loading Content */}
        <div className="text-center space-y-4 mb-8">
          {/* Title with modern typography */}
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight leading-tight">
            {title}
          </h1>

          {/* Message with improved readability */}
          <p className="text-gray-600 text-base leading-relaxed max-w-sm mx-auto">
            {loadingMessage || message}
          </p>
        </div>

        {/* Progress Section */}
        {showProgress && (
          <div className="mb-8 space-y-3">
            {/* Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
              <div
                className={`h-full ${styling.iconBg} transition-all duration-500 ease-out rounded-full`}
                style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
              ></div>
            </div>

            {/* Progress Text */}
            <div className="flex justify-between text-sm text-gray-500">
              <span>Loading...</span>
              <span>{Math.round(progress)}%</span>
            </div>
          </div>
        )}

        {/* Loading Dots Animation */}
        <div className="flex justify-center items-center space-x-2 mb-8">
          <div
            className={`w-2 h-2 ${styling.spinnerColor} rounded-full animate-bounce`}
          ></div>
          <div
            className={`w-2 h-2 ${styling.spinnerColor} rounded-full animate-bounce animation-delay-75`}
          ></div>
          <div
            className={`w-2 h-2 ${styling.spinnerColor} rounded-full animate-bounce animation-delay-150`}
          ></div>
        </div>

        {/* Loading Tips */}
        <div className="text-center">
          <p className="text-sm text-gray-500 leading-relaxed">
            This usually takes just a few seconds
          </p>
        </div>

        {/* Background Pattern */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-gradient-to-r from-purple-400/10 to-pink-400/10 rounded-full blur-2xl animate-pulse animation-delay-100"></div>
        </div>
      </div>
    </div>
  );
};

export default WidgetLoadingMessageView;
