import React from "react";

interface SectionHeaderProps {
  title?: string;
}

const SectionHeader = (props: SectionHeaderProps) => {
  const { title } = props;

  return (
    <div className="relative">
      <div className="absolute inset-0 flex items-center" aria-hidden="true">
        <div className="w-full border-t-2 border-slate-300 dark:border-slate-700" />
      </div>
      <div className="relative flex justify-center">
        <div className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 px-4 sm:px-6 py-2 rounded-full border-2 border-slate-200 dark:border-slate-700 shadow-lg">
          <h2 className="text-sm sm:text-base md:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 animate-pulse" />
            <span className="whitespace-nowrap">{title ?? "New Section"}</span>
          </h2>
        </div>
      </div>
    </div>
  );
};

export default SectionHeader;
