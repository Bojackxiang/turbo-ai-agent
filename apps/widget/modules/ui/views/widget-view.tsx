"use client";

import { useAtomValue } from "jotai";
import WidgetFooter from "../components/widget-footer";
import WidgetHeader from "../components/widget-header";

import { screenAtom } from "@/modules/atoms/widget-atoms";
import WidgetAuthScreen from "./widget-auth-screen";

export const WidgetView = () => {
  const screen = useAtomValue(screenAtom);
  const screenComponents = {
    error: <>error</>,
    loading: <>loading</>,
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
      <WidgetFooter />
    </div>
  );
};
