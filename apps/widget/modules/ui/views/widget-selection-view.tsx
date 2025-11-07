import React, { use, useState } from "react";
import { MessageCircle, Phone, Headphones, ChevronRight } from "lucide-react";
import { useAtomValue, useSetAtom } from "jotai";
import {
  contactSessionIdAtomFamily,
  conversationIdAtom,
  errorMessageAtom,
  organizationIdAtom,
  screenAtom,
  vapiSecretItem,
} from "@/modules/atoms/widget-atoms";
import { useMutation } from "convex/react";
import { api } from "@repo/backend/convex/_generated/api";
import { ConvexError } from "convex/values";
import { WidgetFullHightLoading } from "../components/widget-whole-screen-loading";

interface SelectionOption {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  targetScreen: string;
  gradient: string;
  iconBg: string;
  iconColor: string;
}

const WidgetSelectionView = () => {
  const setScreen = useSetAtom(screenAtom);
  const orgId = useAtomValue(organizationIdAtom);
  const [pending, setPending] = useState<boolean>(false);

  const contactSessionId = useAtomValue(
    contactSessionIdAtomFamily(orgId || "")
  );
  const setError = useSetAtom(errorMessageAtom);
  const setConversationId = useSetAtom(conversationIdAtom);
  const vapiPublicSecret = useAtomValue(vapiSecretItem);

  const createConversation = useMutation(api.public.conversation.create);

  const selectionOptions: SelectionOption[] = [
    {
      id: "chat",
      title: "Start Chat",
      description: "Text-based conversation with our team",
      icon: MessageCircle,
      targetScreen: "chat",
      gradient: "from-blue-500 to-blue-600",
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      id: "voice",
      title: "Start Voice Call",
      description: "AI-powered voice conversation",
      icon: Headphones,
      targetScreen: "voice",
      gradient: "from-purple-500 to-purple-600",
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
    },
    {
      id: "contact",
      title: "Call Us",
      description: "Direct phone call with our support",
      icon: Phone,
      targetScreen: "contact",
      gradient: "from-green-500 to-green-600",
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
    },
  ];

  const handleOptionClick = async (targetScreen: string) => {
    setPending(true);

    await new Promise((resolve) => setTimeout(resolve, 2000));

    if (!contactSessionId) {
      setScreen("auth");
    }

    if (!orgId) {
      setError("Organization ID is missing");
      setScreen("error");
    }

    switch (targetScreen) {
      case "chat":
        try {
          const conversationId = await createConversation({
            contactSessionId: contactSessionId!,
            orgId: orgId!,
          });
          setConversationId(conversationId);
          setScreen("chat");
        } catch (error) {
          // Handling Convex error
          if (error instanceof ConvexError) {
            setError(error.message);
            setScreen("error");
          } else {
            // handle general error
            if (error instanceof Error) {
              setError(error.message);
            } else {
              setError(String(error));
            }
            setScreen("error");
          }
        } finally {
          setPending(false);
        }
        break;
      case "voice":
        setScreen("voice");
        break;
      case "contact":
        break;
      default:
        setPending(false);
        setError("Invalid option selected");
        setScreen("error");
        return;
    }
  };

  return (
    <div className="h-full flex flex-col justify-center p-6 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative">
      {/* Loading Overlay */}
      {pending && (
        <WidgetFullHightLoading
          message="Loading ...."
          subMessage="Please give us a second, We're processing your request.."
        />
      )}

      <div className="w-full max-w-md mx-auto space-y-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            How would you like to connect?
          </h1>
          <p className="text-gray-600 text-base">
            Choose your preferred way to get help
          </p>
        </div>

        {/* Selection Buttons */}
        <div className="space-y-4">
          {selectionOptions.map((option) => {
            const IconComponent = option.icon;

            // conditions for hide voice option
            if (option.id === "voice" && !vapiPublicSecret) {
              return null;
            }

            return (
              <button
                key={option.id}
                onClick={() => handleOptionClick(option.targetScreen)}
                disabled={pending}
                className={`w-full group relative overflow-hidden bg-white rounded-2xl
                         border border-gray-200
                         shadow-sm
                         transform transition-all duration-300 ease-out
                         focus:outline-none focus:ring-4 focus:ring-blue-500/20
                         ${
                           pending
                             ? "opacity-60 cursor-not-allowed"
                             : "hover:border-gray-300 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
                         }`}
              >
                {/* Gradient Background on Hover */}
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${option.gradient}
                               opacity-0 transition-opacity duration-300
                               ${!pending ? "group-hover:opacity-5" : ""}`}
                ></div>

                {/* Content */}
                <div className="relative flex items-center p-6">
                  {/* Left Side: Icon + Text */}
                  <div className="flex items-center flex-1">
                    {/* Icon Container */}
                    <div
                      className={`w-12 h-12 rounded-xl ${option.iconBg}
                                   flex items-center justify-center mr-4
                                   transition-transform duration-300
                                   ${!pending ? "group-hover:scale-110" : ""}`}
                    >
                      <IconComponent
                        className={`w-6 h-6 ${option.iconColor} transition-opacity duration-300
                                   ${pending ? "opacity-50" : ""}`}
                      />
                    </div>

                    {/* Text Content */}
                    <div className="text-left">
                      <h3
                        className={`text-lg font-semibold transition-colors duration-300
                                     ${
                                       pending
                                         ? "text-gray-500"
                                         : "text-gray-900 group-hover:text-gray-800"
                                     }`}
                      >
                        {option.title}
                      </h3>
                      <p
                        className={`text-sm mt-1 transition-colors duration-300
                                    ${pending ? "text-gray-400" : "text-gray-600"}`}
                      >
                        {option.description}
                      </p>
                    </div>
                  </div>

                  {/* Right Side: Arrow */}
                  <div className="ml-4">
                    <ChevronRight
                      className={`w-6 h-6 transition-all duration-300
                                 ${
                                   pending
                                     ? "text-gray-300"
                                     : "text-gray-400 group-hover:text-gray-600 group-hover:translate-x-1"
                                 }`}
                    />
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default WidgetSelectionView;
