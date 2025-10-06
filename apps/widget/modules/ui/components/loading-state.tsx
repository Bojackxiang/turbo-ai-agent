import React from "react";
import { MessageCircle } from "lucide-react";

export const LoadingState: React.FC = () => {
  return (
    <div className="flex items-center justify-center p-12">
      <div className="text-center space-y-4">
        <div className="relative">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 mx-auto flex items-center justify-center">
            <MessageCircle className="h-8 w-8 text-white animate-pulse" />
          </div>
          <div className="absolute -inset-2 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-600/20 animate-ping"></div>
        </div>
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-gray-900">
            Loading conversations
          </h3>
          <p className="text-sm text-gray-600">
            Just a moment while we fetch your chats...
          </p>
        </div>
      </div>
    </div>
  );
};
