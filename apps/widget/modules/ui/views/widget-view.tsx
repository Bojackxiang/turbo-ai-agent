"use client";

import { useAtomValue } from "jotai";
import WidgetFooter from "../components/widget-footer";
import WidgetHeader from "../components/widget-header";

import { screenAtom } from "@/modules/atoms/widget-atoms";
import WidgetAuthScreen from "../screens/widget-auth-screen";
import WIdgetErrorScreen from "../screens/widget-error-screen";
import WidgetLoadingScreen from "../screens/widget-loading-screen";

export const WidgetView = () => {
  const screen = useAtomValue(screenAtom);
  const screenComponents = {
    error: <WIdgetErrorScreen />,
    loading: <WidgetLoadingScreen />,
    selection: <>selection</>,
    voice: <>voice</>,
    auth: <WidgetAuthScreen />,
    inbox: <>inbox</>,
    chat: <>chat</>,
    contact: <>contact</>,
  };

  return (
    <div className="flex h-screen w-full flex-col bg-background text-foreground">
      {screenComponents[screen]}
    </div>
  );
};
