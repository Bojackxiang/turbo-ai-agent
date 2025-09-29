"use client";

import WidgetFooter from "../components/widget-footer";
import WidgetHeader from "../components/widget-header";
import AuthorizedView from "./widget-authorized-view";

export const WidgetView = () => {
  return (
    <div className="flex h-screen w-full flex-col bg-background text-foreground">
      <WidgetHeader>How we can help you today!</WidgetHeader>
      <AuthorizedView />
      <WidgetFooter />
    </div>
  );
};
