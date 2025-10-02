"use client";

import React from "react";
import WidgetHeader from "../components/widget-header";
import WidgetSelectionView from "../views/widget-selection-view";
import WidgetFooter from "../components/widget-footer";

const WidgetSelectionScreen = () => {
  return (
    <div className="flex h-screen w-full flex-col bg-background text-foreground">
      <WidgetHeader>Selection</WidgetHeader>
      <main className="flex-1 overflow-auto ">
        <WidgetSelectionView />
      </main>
    </div>
  );
};

export default WidgetSelectionScreen;
