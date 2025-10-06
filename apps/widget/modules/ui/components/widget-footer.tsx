import { useEffect, useState } from "react";
import { HomeIcon, InboxIcon } from "lucide-react";
import TabButton from "./tab-button";
import { useAtomValue, useSetAtom } from "jotai";
import { screenAtom } from "@/modules/atoms/widget-atoms";

type TabType = "inbox" | "selection";

const WidgetFooter = () => {
  const screen = useAtomValue(screenAtom);
  const setScreen = useSetAtom(screenAtom);

  const [activeTab, setActiveTab] = useState<TabType>("inbox");

  useEffect(() => {
    if (screen === "inbox") {
      setActiveTab("inbox");
    } else {
      setActiveTab("selection");
    }
  }, []);

  const handleHomeClick = () => {
    setActiveTab("selection");
  };

  const handleInboxClick = () => {
    setScreen("inbox");
  };

  return (
    <footer className="sticky bottom-0 z-50 w-full bg-gradient-to-t from-blue-100/95 via-blue-100/90 to-blue-50/85 backdrop-blur-xl border-t border-blue-300/60 shadow-2xl shadow-blue-500/10">
      {/* Subtle top highlight */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-400/50 to-transparent" />

      <div className="flex h-22 px-3 py-3 safe-area-inset-bottom">
        <TabButton
          icon={HomeIcon}
          label="selection"
          isActive={activeTab === "selection"}
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
