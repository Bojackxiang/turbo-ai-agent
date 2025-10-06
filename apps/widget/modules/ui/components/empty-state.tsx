import React from "react";
import { MessageCircle } from "lucide-react";

export const EmptyState: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center">
      <div className="relative mb-6">
        <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-gray-100 to-gray-200 mx-auto flex items-center justify-center">
          <MessageCircle className="h-10 w-10 text-gray-400" />
        </div>
        <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
          <span className="text-white text-xs font-bold">+</span>
        </div>
      </div>
      <div className="space-y-3 max-w-sm">
        <h3 className="text-xl font-bold text-gray-900">
          No conversations yet
        </h3>
        <p className="text-gray-600 leading-relaxed">
          Your inbox is empty. Start a new conversation to see it appear here
          with real-time updates.
        </p>
      </div>
      <div className="mt-6 px-4 py-2 rounded-xl bg-blue-50 border border-blue-100">
        <p className="text-sm text-blue-700 font-medium">
          💡 Tip: New messages will appear instantly
        </p>
      </div>
    </div>
  );
};
