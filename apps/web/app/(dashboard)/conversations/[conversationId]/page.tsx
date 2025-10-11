import ConversationIdView from "@/modules/dashboard/view/conversation-view";
import { Id } from "@repo/backend/convex/_generated/dataModel";

const Page = async ({
  params,
}: {
  params: Promise<{ conversationId: Id<"conversation"> }>;
}) => {
  const { conversationId } = await params;

  return <ConversationIdView conversationId={conversationId} />;
};

export default Page;
