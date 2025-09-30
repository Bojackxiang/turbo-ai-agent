"use client";

import WidgetHeader from "../components/widget-header";
import WidgetLoadingMessageView from "../views/widget-loading-message-view copy";

const WidgetLoadingScreen = () => {
  return (
    <div className="flex h-screen w-full flex-col bg-background text-foreground">
      <WidgetHeader>Error!</WidgetHeader>
      <main className="flex-1 overflow-auto ">
        <WidgetLoadingMessageView />
      </main>
    </div>
  );
};

export default WidgetLoadingScreen;
