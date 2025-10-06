"use client";

import React from "react";
import WidgetHeader from "../components/widget-header";
import { useAtomValue, useSetAtom } from "jotai";
import {
  contactSessionIdAtomFamily,
  conversationIdAtom,
  errorMessageAtom,
  organizationIdAtom,
  screenAtom,
} from "@/modules/atoms/widget-atoms";
import { api } from "@repo/backend/convex/_generated/api";
import { usePaginatedQuery } from "convex/react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

// Import new components
import { ConversationCard } from "../components/conversation-card";
import { EmptyState } from "../components/empty-state";
import { LoadingState } from "../components/loading-state";
import { LoadMoreButton } from "../components/load-more-button";
import { Id } from "@repo/backend/convex/_generated/dataModel";

// Import new hooks

const WidgetInboxScreen = () => {
  const errorMessage = useAtomValue(errorMessageAtom);
  const orgId = useAtomValue(organizationIdAtom);
  const contactSessionId = useAtomValue(
    contactSessionIdAtomFamily(orgId || "")
  );
  const setScreen = useSetAtom(screenAtom);
  const setConversationId = useSetAtom(conversationIdAtom);
  const setContactSessionId = useSetAtom(
    contactSessionIdAtomFamily(orgId || "")
  );

  const conversations = usePaginatedQuery(
    api.public.conversation.getMany,
    contactSessionId ? { contactSessionId } : "skip",
    { initialNumItems: 10 }
  );

  const goBack = () => {
    setScreen("selection");
  };

  const handleConversationClick = (conversationId: Id<"conversation">) => {
    setConversationId(conversationId);
    setContactSessionId(contactSessionId);

    setScreen("chat");
  };

  return (
    <div className="flex h-screen w-full flex-col bg-gradient-to-br from-slate-50 via-gray-50 to-blue-50/50">
      <WidgetHeader>
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center">
            <Button
              className="p-2 hover:bg-white/80 rounded-xl transition-all duration-200"
              variant={"ghost"}
              onClick={goBack}
            >
              <ArrowLeft className="h-5 w-5 text-white" />
            </Button>
            <div className="ml-3">
              <h1 className="text-xl font-bold text-white bg-clip-text ">
                Conversations
              </h1>
              {conversations.results && (
                <p className="text-sm text-gray-200 ">
                  {conversations.results.length} active chat
                  {conversations.results.length !== 1 ? "s" : ""}
                </p>
              )}
            </div>
          </div>

          {/* Modern Status Indicator */}
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
            <span className="text-xs font-medium text-gray-600">Live</span>
          </div>
        </div>
      </WidgetHeader>

      <main className="flex-1 overflow-auto">
        {conversations.isLoading ? (
          <LoadingState />
        ) : conversations.results && conversations.results.length > 0 ? (
          <div className="p-4 space-y-3">
            {conversations.results.map((conversation: any) => (
              <ConversationCard
                key={conversation._id}
                conversation={conversation}
                onClick={handleConversationClick}
              />
            ))}
          </div>
        ) : (
          <EmptyState />
        )}

        {/* Load More Button */}
        {conversations.status === "CanLoadMore" && (
          <LoadMoreButton
            isLoading={conversations.isLoading}
            onLoadMore={() => conversations.loadMore(10)}
          />
        )}
      </main>
    </div>
  );
};

export default WidgetInboxScreen;
