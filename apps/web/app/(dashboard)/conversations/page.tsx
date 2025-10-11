import React from "react";
import { MessageCircle, ArrowLeft, Sparkles, Users, Bot } from "lucide-react";

const Page = () => {
  return (
    <div className="h-full flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-blue-50/30 p-6 sm:p-8">
      <div className="max-w-2xl w-full text-center space-y-8">
        {/* Hero Icon with floating animation */}
        <div className="relative mx-auto w-32 h-32 sm:w-40 sm:h-40">
          {/* Main icon container */}
          <div className="relative w-full h-full rounded-3xl bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-600 shadow-2xl shadow-blue-500/25 flex items-center justify-center backdrop-blur-sm">
            <MessageCircle className="w-16 h-16 sm:w-20 sm:h-20 text-white" />

            {/* Floating sparkles */}
            <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 flex items-center justify-center animate-bounce delay-100">
              <Sparkles className="w-3 h-3 text-white" />
            </div>

            {/* Pulse ring */}
            <div className="absolute inset-0 rounded-3xl bg-blue-500/20 animate-ping"></div>

            {/* Small floating icons */}
            <div
              className="absolute -left-4 top-4 w-8 h-8 rounded-xl bg-gradient-to-r from-emerald-400 to-teal-500 flex items-center justify-center shadow-lg animate-bounce"
              style={{ animationDelay: "0.5s", animationDuration: "3s" }}
            >
              <Users className="w-4 h-4 text-white" />
            </div>

            <div
              className="absolute -right-4 bottom-4 w-8 h-8 rounded-xl bg-gradient-to-r from-purple-400 to-pink-500 flex items-center justify-center shadow-lg animate-bounce"
              style={{ animationDelay: "2s", animationDuration: "3s" }}
            >
              <Bot className="w-4 h-4 text-white" />
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="space-y-6">
          <div className="space-y-3">
            <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 bg-clip-text text-transparent leading-tight">
              Welcome to Conversations
            </h1>
            <p className="text-lg text-slate-600 leading-relaxed max-w-lg mx-auto">
              Manage and respond to customer conversations with AI assistance.
              Get started by selecting a conversation from the sidebar.
            </p>
          </div>

          {/* CTA with arrow indicator */}
          <div className="flex items-center justify-center space-x-3 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-100/50 backdrop-blur-sm">
            <div className="flex items-center space-x-2 px-4 py-2 bg-white rounded-xl shadow-sm border border-slate-100">
              <ArrowLeft className="w-5 h-5 text-blue-600 animate-pulse" />
              <span className="text-sm font-medium text-slate-700">
                Select a conversation
              </span>
            </div>
            <div className="text-sm text-slate-500">to get started</div>
          </div>
        </div>

        {/* Feature highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-12">
          <div className="p-4 rounded-xl bg-white/60 backdrop-blur-sm border border-slate-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center mb-3 mx-auto">
              <MessageCircle className="w-5 h-5 text-white" />
            </div>
            <h3 className="font-semibold text-slate-800 text-sm mb-1">
              Real-time Chat
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Respond to customers instantly with live conversations
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white/60 backdrop-blur-sm border border-slate-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-600 flex items-center justify-center mb-3 mx-auto">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <h3 className="font-semibold text-slate-800 text-sm mb-1">
              AI Assistant
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Get intelligent suggestions and automated responses
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white/60 backdrop-blur-sm border border-slate-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-purple-500 to-pink-600 flex items-center justify-center mb-3 mx-auto">
              <Users className="w-5 h-5 text-white" />
            </div>
            <h3 className="font-semibold text-slate-800 text-sm mb-1">
              Team Management
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Collaborate with your team on customer support
            </p>
          </div>
        </div>

        {/* Subtle tip */}
        <div className="mt-8 p-3 bg-gradient-to-r from-amber-50 to-yellow-50 rounded-xl border border-amber-100/50">
          <p className="text-sm text-amber-800 font-medium flex items-center justify-center space-x-2">
            <Sparkles className="w-4 h-4" />
            <span>Tip: Use filters to find specific conversation types</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Page;
