import { useCallback, useEffect, useRef } from "react";

interface useInfiniteScrollProps {
  status: "LoadingFirstPage" | "LoadingMore" | "Exhausted" | "CanLoadMore";
  loadMore: (numItems: number) => void;
  loadSize?: number;
  observerEnabled?: boolean;
}

export function useInfiniteScroll({
  status,
  loadMore,
  loadSize = 10,
  observerEnabled = true,
}: useInfiniteScrollProps) {
  const topElementRef = useRef<HTMLDivElement | null>(null);

  const handleLoadMore = useCallback(() => {
    if (status === "CanLoadMore") {
      loadMore(loadSize);
    }
  }, [status, loadMore, loadSize]);

  useEffect(() => {
    const topElement = topElementRef.current;
    if (!topElement && observerEnabled) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry?.isIntersecting) {
            handleLoadMore();
          }
        });
      },
      { threshold: 1.0 }
    );

    observer.observe(topElement!);

    return () => {
      observer.disconnect();
    };
  }, [observerEnabled, observerEnabled]);

  return {
    topElementRef,
    handleLoadMore,

    canLoadMore: status === "CanLoadMore",
    isLoadingMore: status === "LoadingMore",
    isLoadingFirstPage: status === "LoadingFirstPage",
    isExhausted: status === "Exhausted",
  };
}
