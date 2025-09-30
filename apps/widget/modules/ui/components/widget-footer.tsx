import { useState } from "react";
import { HomeIcon, InboxIcon } from "lucide-react";
import TabButton from "./tab-button";

type TabType = "home" | "inbox";

const WidgetFooter = () => {
  const [activeTab, setActiveTab] = useState<TabType>("inbox");

  const handleHomeClick = () => {
    setActiveTab("home");
  };

  const handleInboxClick = () => {
    setActiveTab("inbox");
  };

  return (
    <footer className="sticky bottom-0 z-50 w-full bg-gradient-to-t from-blue-100/95 via-blue-100/90 to-blue-50/85 backdrop-blur-xl border-t border-blue-300/60 shadow-2xl shadow-blue-500/10">
      {/* Subtle top highlight */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-400/50 to-transparent" />

      <div className="flex h-22 px-3 py-3 safe-area-inset-bottom">
        <TabButton
          icon={HomeIcon}
          label="Home"
          isActive={activeTab === "home"}
          onClick={handleHomeClick}
        />

        <TabButton
          icon={InboxIcon}
          label="Inbox"
          isActive={activeTab === "inbox"}
          onClick={handleInboxClick}
        />
      </div>
    </footer>
  );
};

export default WidgetFooter;
