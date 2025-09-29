import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface TabButtonProps {
  icon: LucideIcon;
  label: string;
  isActive: boolean;
  onClick?: () => void;
  className?: string;
}

const TabButton = ({
  icon: Icon,
  label,
  isActive,
  onClick,
  className,
}: TabButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex-1 flex flex-col items-center justify-center gap-2 rounded-2xl mx-2 py-3 transition-all duration-300 active:scale-95 touch-manipulation relative overflow-hidden",
        isActive
          ? "bg-gradient-to-br from-blue-600 via-blue-600 to-blue-500 text-white shadow-xl shadow-blue-600/40 scale-[1.02] border border-blue-500/20"
          : "text-gray-500 hover:text-blue-600 hover:bg-blue-50 active:bg-blue-100 hover:scale-[1.01] border border-transparent",
        className
      )}
    >
      {/* Active state glow effect */}
      {isActive && (
        <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 via-transparent to-blue-500/10 rounded-2xl" />
      )}

      <Icon
        className={cn(
          "transition-all duration-300 relative z-10",
          isActive
            ? "size-7 text-white drop-shadow-lg"
            : "size-6 hover:size-7 text-gray-500 hover:text-blue-600"
        )}
      />
      <span
        className={cn(
          "text-xs font-medium transition-all duration-300 relative z-10",
          isActive
            ? "text-white font-semibold tracking-wide"
            : "text-gray-500 hover:text-blue-600 hover:font-medium"
        )}
      >
        {label}
      </span>
    </button>
  );
};

export default TabButton;
