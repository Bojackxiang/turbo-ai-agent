"use client";

import React from "react";
import WidgetHeader from "../components/widget-header";
import { useAtomValue } from "jotai";
import { errorMessageAtom } from "@/modules/atoms/widget-atoms";
import WidgetErrorMessageView from "../views/widget-error-message-view";

const WIdgetErrorScreen = () => {
  const errorMessage = useAtomValue(errorMessageAtom);

  return (
    <div className="flex h-screen w-full flex-col bg-background text-foreground">
      <WidgetHeader>Error!</WidgetHeader>
      <main className="flex-1 overflow-auto ">
        <WidgetErrorMessageView message={errorMessage} />
      </main>
    </div>
  );
};

export default WIdgetErrorScreen;
