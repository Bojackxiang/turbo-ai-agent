import { Settings } from "lucide-react";
import React from "react";

const Header = () => {
  return (
    <div className="mb-6 sm:mb-8">
      <div className="flex items-center gap-3 sm:gap-4 mb-3">
        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center shadow-lg">
          <Settings className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white">
            Widget Customization
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Configure your chat widget settings and appearance
          </p>
        </div>
      </div>
    </div>
  );
};

export default Header;
