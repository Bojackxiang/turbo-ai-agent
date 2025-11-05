import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MessageSquare, Plus, Sparkles } from "lucide-react";
import React from "react";

interface EmptyState {
  onCreateClickHandler: () => void;
}

const EmptyState = (props: EmptyState) => {
  return (
    <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-800 shadow-lg">
      {/* Decorative background */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-purple-500 to-blue-500 opacity-5 blur-3xl rounded-full transform translate-x-20 -translate-y-20" />

      <div className="relative p-8 sm:p-12 text-center">
        <div className="max-w-md mx-auto space-y-6">
          {/* Icon */}
          <div className="relative inline-block">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-br from-purple-500/10 to-blue-500/10 flex items-center justify-center mx-auto">
              <MessageSquare className="w-10 h-10 sm:w-12 sm:h-12 text-purple-600 dark:text-purple-400" />
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center animate-bounce">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
          </div>

          {/* Text */}
          <div className="space-y-2">
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              No Widget Settings Yet
            </h3>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
              Get started by creating your first widget configuration. Customize
              greetings, messages, and VAPI settings to match your brand.
            </p>
          </div>

          {/* CTA Button */}
          <Button
            onClick={props.onCreateClickHandler}
            className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white px-6 py-3 rounded-lg font-medium shadow-md hover:shadow-lg transition-all duration-200"
          >
            <Plus className="w-4 h-4 mr-2" />
            Create Your First Setting
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default EmptyState;
