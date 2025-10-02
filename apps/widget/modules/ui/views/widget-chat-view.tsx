import React, { use } from "react";
import WidgetHeader from "../components/widget-header";
import { ArrowLeft, MenuIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { v } from "convex/values";
import { useAtomValue } from "jotai";
import {
  conversationIdAtom,
  organizationIdAtom,
} from "@/modules/atoms/widget-atoms";
import { useQuery } from "convex/react";
import { api } from "@repo/backend/convex/_generated/api";
import { contactSessionIdAtomFamily } from "../../atoms/widget-atoms";

export const WidgetChatView = ({}) => {
  const conversationId = useAtomValue(conversationIdAtom);
  const orgId = useAtomValue(organizationIdAtom);
  const contactSessionId = useAtomValue(
    contactSessionIdAtomFamily(orgId || "")
  );

  console.log({ orgId, contactSessionId, conversationId });

  const conversation = useQuery(
    api.public.conversation.getOne,
    conversationId && contactSessionId
      ? {
          conversationId,
          contactSessionId,
        }
      : "skip"
  );

  console.log({ conversation });

  return (
    <div className={`h-full `}>
      <div className="bg-red-300 p-4 overflow-wrap-anywhere whitespace-pre-wrap">
        {JSON.stringify(conversation, null, 2)}
      </div>
    </div>
  );
};
