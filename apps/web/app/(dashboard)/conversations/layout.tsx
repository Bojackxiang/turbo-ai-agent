import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { ScrollArea } from "@/components/ui/scroll-area";
import ConversationPanel from "@/modules/dashboard/ui/conversation-panel";

const ConversationLayout = ({ children }: React.PropsWithChildren) => {
  return (
    <ResizablePanelGroup direction="horizontal" className="h-full">
      <ResizablePanel defaultSize={25} maxSize={35} minSize={15}>
        <ConversationPanel />
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel className="h-full overflow-hidden">
        <ScrollArea className="h-full">
          <div className="w-full">{children}</div>
        </ScrollArea>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};

export default ConversationLayout;
