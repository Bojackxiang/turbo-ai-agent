"use client";

import React from "react";
import WidgetHeader from "../components/widget-header";
import WidgetAuthFormView from "./widget-auth-form-view";

const WidgetAuthScreen = () => {
  return (
    <div className="flex h-screen w-full flex-col bg-background text-foreground">
      <WidgetHeader>Login in to start</WidgetHeader>
      <main className="flex-1 overflow-auto p-6 space-y-6 ">
        <WidgetAuthFormView />
      </main>
    </div>
  );
};

export default WidgetAuthScreen;
