import { useState } from "react";
import { HomeIcon, InboxIcon } from "lucide-react";
import TabButton from "./tab-button";

type TabType = "home" | "inbox";

const WidgetFooter = () => {
  const [activeTab, setActiveTab] = useState<TabType>("inbox");

  const handleHomeClick = () => {
    setActiveTab("home");
    console.log("Home button clicked");
  };

  const handleInboxClick = () => {
    setActiveTab("inbox");
    console.log("Inbox button clicked");
  };

  return (
    <footer className="sticky bottom-0 z-50 w-full bg-gradient-to-t from-white/98 via-white/95 to-white/90 backdrop-blur-xl border-t border-gray-200/50 shadow-2xl">
      {/* Subtle top highlight */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-300/50 to-transparent" />

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
