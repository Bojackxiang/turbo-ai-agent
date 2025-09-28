"use client";

import WidgetFooter from "../components/widget-footer";
import WidgetHeader from "../components/widget-header";

interface Props {
  orgId: string;
}

export const WidgetView = ({ orgId }: Props) => {
  return (
    <main className="flex h-full w-full flex-col overflow-hidden rounded-xl border bg-background text-foreground p-4 space-y-4">
      <div className="bg-primary text-primary-foreground p-4 rounded-lg shadow-lg">
        <h1 className="text-xl font-bold">Widget Application</h1>
        <p className="text-sm opacity-90">Organization ID: {orgId}</p>
      </div>

      <div className="bg-secondary text-secondary-foreground p-4 rounded-lg">
        <h2 className="text-lg font-semibold mb-2">Beautiful OKLCH Colors</h2>
        <p className="text-sm">This widget uses a modern OKLCH color scheme!</p>
      </div>

      <div className="bg-accent text-accent-foreground p-4 rounded-lg">
        <h3 className="text-md font-medium">Accent Section</h3>
        <p className="text-sm">Vibrant accent color for highlights</p>
      </div>

      <div className="bg-muted text-muted-foreground p-4 rounded-lg">
        <h4 className="text-sm font-medium">Muted Section</h4>
        <p className="text-xs">
          Subtle muted colors for less important content
        </p>
      </div>

      <WidgetHeader>Header component</WidgetHeader>
      <WidgetFooter />
    </main>
  );
};
