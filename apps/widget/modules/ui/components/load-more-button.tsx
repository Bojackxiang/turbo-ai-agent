import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface LoadMoreButtonProps {
  isLoading: boolean;
  onLoadMore: () => void;
}

export const LoadMoreButton: React.FC<LoadMoreButtonProps> = ({
  isLoading,
  onLoadMore,
}) => {
  return (
    <div className="p-6">
      <Button
        variant="outline"
        className="w-full py-4 rounded-2xl border-2 border-gray-200 hover:border-blue-300 hover:bg-blue-50/50 transition-all duration-300 group"
        onClick={onLoadMore}
        disabled={isLoading}
      >
        {isLoading ? (
          <div className="flex items-center space-x-3">
            <div className="w-5 h-5 rounded-full border-2 border-gray-300 border-t-blue-500 animate-spin"></div>
            <span className="font-medium text-gray-700">
              Loading more conversations...
            </span>
          </div>
        ) : (
          <div className="flex items-center space-x-3">
            <div className="w-5 h-5 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
              <ArrowLeft className="h-3 w-3 text-white rotate-[-90deg]" />
            </div>
            <span className="font-semibold text-gray-800">
              Load More Conversations
            </span>
          </div>
        )}
      </Button>
    </div>
  );
};
