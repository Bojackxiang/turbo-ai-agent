"use client";

import WidgetFooter from "../components/widget-footer";
import WidgetHeader from "../components/widget-header";

interface Props {
  orgId: string;
}

export const WidgetView = ({ orgId }: Props) => {
  return (
    <div className="flex h-screen w-full flex-col bg-background text-foreground">
      <WidgetHeader>Widget Application - {orgId}</WidgetHeader>

      {/* Main Content - 占满中间剩余空间，可滚动 */}
      <main className="flex-1 overflow-auto p-6 space-y-6">
        <div className="bg-primary text-primary-foreground p-6 rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold mb-2">Widget Application</h1>
          <p className="text-sm opacity-90">Organization ID: {orgId}</p>
        </div>

        <div className="bg-secondary text-secondary-foreground p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-3">Beautiful OKLCH Colors</h2>
          <p className="text-base">
            This widget uses a modern OKLCH color scheme!
          </p>
        </div>

        <div className="bg-accent text-accent-foreground p-6 rounded-lg">
          <h3 className="text-lg font-medium mb-2">Accent Section</h3>
          <p className="text-base">Vibrant accent color for highlights</p>
        </div>

        <div className="bg-muted text-muted-foreground p-6 rounded-lg">
          <h4 className="text-base font-medium mb-2">Muted Section</h4>
          <p className="text-sm">
            Subtle muted colors for less important content
          </p>
        </div>

        {/* 额外的内容区域，展示滚动效果 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-card text-card-foreground p-4 rounded-lg border">
            <h5 className="font-semibold mb-2">Card 1</h5>
            <p className="text-sm">Some card content here</p>
          </div>
          <div className="bg-card text-card-foreground p-4 rounded-lg border">
            <h5 className="font-semibold mb-2">Card 2</h5>
            <p className="text-sm">More content to demonstrate layout</p>
          </div>
        </div>

        {/* 更多内容用于演示滚动 */}
        {Array.from({ length: 5 }, (_, i) => (
          <div key={i} className="bg-muted/50 p-4 rounded-lg">
            <p className="text-sm">
              Additional content block {i + 1} - This demonstrates the
              scrollable content area
            </p>
          </div>
        ))}
      </main>

      {/* Footer - 固定在底部 */}
      <WidgetFooter />
    </div>
  );
};
