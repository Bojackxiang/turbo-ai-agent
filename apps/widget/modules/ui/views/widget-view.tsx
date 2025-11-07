"use client";

import { useAtomValue } from "jotai";

import { screenAtom } from "@/modules/atoms/widget-atoms";
import WidgetAuthScreen from "../screens/widget-auth-screen";
import WIdgetErrorScreen from "../screens/widget-error-screen";
import WidgetLoadingScreen from "../screens/widget-loading-screen";
import WidgetSelectionScreen from "../screens/widget-selection-screen";
import WidgetChatScreen from "../screens/widget-chat-screen";
import WidgetInboxScreen from "../screens/widget-inbox-screen";
import WidgetVoiceView from "./widget-voice-view";

export const WidgetView = () => {
  const screen = useAtomValue(screenAtom);
  const screenComponents = {
    error: <WIdgetErrorScreen />,
    loading: <WidgetLoadingScreen />,
    selection: <WidgetSelectionScreen />,
    voice: <WidgetVoiceView />,
    auth: <WidgetAuthScreen />,
    inbox: <WidgetInboxScreen />,
    chat: <WidgetChatScreen />,
    contact: <>contact</>,
  };

  return (
    <div className="flex h-screen w-full flex-col bg-background text-foreground">
      {screenComponents[screen]}
    </div>
  );
};
