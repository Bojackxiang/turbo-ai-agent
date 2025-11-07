"use client";

import { use } from "react";
import { useVapi } from "../modules/hooks/use-vapi";
import { WidgetView } from "@/modules/ui/views/widget-view";

interface Props {
  searchParams: Promise<{
    orgId: string;
  }>;
}

export default function Page({ searchParams }: Props) {
  return <WidgetView />;
}
