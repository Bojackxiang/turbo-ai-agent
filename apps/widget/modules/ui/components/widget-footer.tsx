import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { HomeIcon, InboxIcon } from "lucide-react";

const WidgetFooter = () => {
  const screen = "select";

  return (
    <footer className="flex items-center justify-between border-t bg-background">
      <Button
        className="h-14 flex-1 rounded-none "
        size={"icon"}
        variant={"ghost"}
      >
        <HomeIcon
          className={cn("size-5", screen === "select" && "text-primary")}
        />
      </Button>
      <Button
        className="h-14 flex-1 rounded-none "
        size={"icon"}
        variant={"ghost"}
      >
        <InboxIcon
          className={cn("size-5", screen === "select" && "text-primary")}
        />
      </Button>
    </footer>
  );
};

export default WidgetFooter;
