import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import ConversationPanel from "@/modules/dashboard/ui/conversation-panel";

const ConversationLayout = ({ children }: React.PropsWithChildren) => {
  return (
    <ResizablePanelGroup direction="horizontal" className="h-full flex-1">
      <ResizablePanel defaultSize={35} maxSize={45} minSize={30}>
        <ConversationPanel />
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel
        defaultSize={60}
        minSize={40}
        className="h-full overflow-hidden"
      >
        <div className="h-full w-full p-4 overflow-auto">{children}</div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};

export default ConversationLayout;
