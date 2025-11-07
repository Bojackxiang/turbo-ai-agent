"use client";

import { WidgetView } from "@/modules/ui/views/widget-view";
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense>
      <WidgetView />
    </Suspense>
  );
}
