"use client";

import { useSearchParams } from "next/navigation";
import WidgetHeader from "../components/widget-header";
import WidgetLoadingMessageView from "../views/widget-loading-message-view";

const WidgetLoadingScreen = () => {
  const searchParams = useSearchParams();
  const orgId = searchParams.get("orgId");

  return (
    <div className="flex h-screen w-full flex-col bg-background text-foreground">
      <WidgetHeader>Error!</WidgetHeader>
      <main className="flex-1 overflow-auto ">
        <WidgetLoadingMessageView orgId={orgId} />
      </main>
    </div>
  );
};

export default WidgetLoadingScreen;
