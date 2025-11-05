import { Loader2, Settings } from "lucide-react";
import React from "react";

const Loading = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 p-3 sm:p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Loading Header Skeleton */}
        <div className="mb-6 sm:mb-8">
          <div className="flex items-center gap-3 sm:gap-4 mb-3">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center shadow-lg animate-pulse">
              <Settings className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
            </div>
            <div className="flex-1 space-y-2">
              <div className="h-8 sm:h-10 bg-slate-200 dark:bg-slate-700 rounded-lg w-48 animate-pulse" />
              <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-64 animate-pulse" />
            </div>
          </div>
        </div>

        {/* Loading Content */}
        <div className="flex items-center justify-center py-20">
          <div className="text-center space-y-4">
            <div className="relative">
              <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-purple-500 to-blue-500 opacity-20 animate-pulse" />
              <Loader2 className="w-16 h-16 absolute top-0 left-1/2 -translate-x-1/2 text-purple-600 dark:text-purple-400 animate-spin" />
            </div>
            <p className="text-slate-600 dark:text-slate-400 font-medium">
              Loading widget settings...
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
