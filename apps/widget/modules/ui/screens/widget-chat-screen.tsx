"use client";

import React from "react";
import WidgetHeader from "../components/widget-header";
import { WidgetChatView } from "../views/widget-chat-view";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MenuIcon } from "lucide-react";
import { useSetAtom } from "jotai";
import { screenAtom } from "@/modules/atoms/widget-atoms";

// ==================== Main Component ====================

const WidgetChatScreen = () => {
  return (
    <div className="flex h-screen w-full flex-col bg-background text-foreground">
      <ChatScreenHeader />
      <main className="flex-1 overflow-auto ">
        <WidgetChatView />
      </main>
    </div>
  );
};

export default WidgetChatScreen;

// ==================== Local Components ====================
const ChatScreenHeader = () => {
  const setScreen = useSetAtom(screenAtom);
  const handleGoBack = () => {
    setScreen("inbox");
  };

  const handleMenuClick = () => {
    // TODO: 实现菜单逻辑
    console.log("Menu clicked");
  };

  return (
    <WidgetHeader>
      <div className="flex justify-between items-center w-full">
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="icon"
            className="mr-2"
            onClick={handleGoBack}
            aria-label="返回"
          >
            <ArrowLeft />
          </Button>
          <span className="text-lg font-semibold">Chat</span>
        </div>
        <div>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleMenuClick}
            aria-label="menu"
          >
            <MenuIcon />
          </Button>
        </div>
      </div>
    </WidgetHeader>
  );
};
