import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useInfiniteScroll } from "@repo/shared-hooks";

interface InfiniteTriggerProps {
  canLoadMore?: boolean;
  isLoadingMore?: boolean;
  isLoadingFirstPage?: boolean;
  isExhausted?: boolean;
  loadMoreText?: string;
  noMoreText?: string;
  className?: string;
  ref?: React.Ref<HTMLDivElement>;

  onLoadMore?: () => void;
}

const InfiniteTrigger = ({
  canLoadMore,
  isLoadingMore,
  isLoadingFirstPage,
  isExhausted,
  loadMoreText = "Load More",
  noMoreText = "No More Items",
  className,
  ref,

  onLoadMore,
}: InfiniteTriggerProps) => {
  let text = loadMoreText;

  if (isLoadingMore) {
    text = "loading...";
  } else if (!canLoadMore) {
    text = noMoreText;
  }

  return (
    <div className={cn("flex w-full justify-center py-2", className)} ref={ref}>
      <Button
        variant="ghost"
        disabled={!canLoadMore || isLoadingMore}
        size={"sm"}
        onClick={onLoadMore}
      >
        {text}
      </Button>
    </div>
  );
};

export default InfiniteTrigger;
