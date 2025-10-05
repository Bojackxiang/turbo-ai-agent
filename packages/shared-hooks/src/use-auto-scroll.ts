import { useEffect, useRef } from "react";

interface UseAutoScrollOptions {
  /**
   * 是否启用自动滚动
   * @default true
   */
  enabled?: boolean;

  /**
   * 滚动行为
   * @default "smooth"
   */
  behavior?: ScrollBehavior;

  /**
   * 只有当用户接近底部时才自动滚动
   * @default true
   */
  onlyWhenNearBottom?: boolean;

  /**
   * 距离底部多少像素内认为是"接近底部"
   * @default 100
   */
  threshold?: number;
}

interface UseAutoScrollReturn {
  /**
   * 滚动容器的ref
   */
  scrollRef: React.RefObject<HTMLDivElement>;

  /**
   * 手动滚动到底部
   */
  scrollToBottom: () => void;

  /**
   * 检查是否接近底部
   */
  isNearBottom: () => boolean;
}

/**
 * 自动滚动到底部的Hook
 *
 * @example
 * ```tsx
 * const { scrollRef, scrollToBottom } = useAutoScroll(messages, {
 *   enabled: true,
 *   behavior: "smooth",
 *   onlyWhenNearBottom: true
 * });
 *
 * return (
 *   <div ref={scrollRef} className="overflow-auto">
 *     {messages.map(msg => <Message key={msg.id} {...msg} />)}
 *   </div>
 * );
 * ```
 */
export function useAutoScroll(
  dependency: any,
  options: UseAutoScrollOptions = {}
): UseAutoScrollReturn {
  const {
    enabled = true,
    behavior = "smooth",
    onlyWhenNearBottom = true,
    threshold = 100,
  } = options;

  const scrollRef = useRef<HTMLDivElement>(null);
  const isUserScrollingRef = useRef(false);
  const scrollTimeoutRef = useRef<number>();

  const scrollToBottom = () => {
    const element = scrollRef.current;
    if (!element) return;

    element.scrollTo({
      top: element.scrollHeight,
      behavior,
    });
  };

  const isNearBottom = () => {
    const element = scrollRef.current;
    if (!element) return false;

    const { scrollTop, scrollHeight, clientHeight } = element;
    const distanceFromBottom = scrollHeight - scrollTop - clientHeight;
    return distanceFromBottom <= threshold;
  };

  // 监听用户滚动行为
  useEffect(() => {
    const element = scrollRef.current;
    if (!element) return;

    const handleScroll = () => {
      // 用户主动滚动时设置标记
      isUserScrollingRef.current = true;

      // 清除之前的定时器
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

      // 500ms后重置滚动标记
      scrollTimeoutRef.current = setTimeout(() => {
        isUserScrollingRef.current = false;
      }, 500);
    };

    element.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      element.removeEventListener("scroll", handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  // 监听依赖变化并自动滚动
  useEffect(() => {
    if (!enabled) return;

    console.log("🚀 Auto-scroll triggered:", {
      enabled,
      isUserScrolling: isUserScrollingRef.current,
      isNearBottom: isNearBottom(),
      onlyWhenNearBottom,
      dependency: JSON.stringify(dependency).slice(0, 100) + "...",
    });

    // 如果用户正在滚动，不要自动滚动
    if (isUserScrollingRef.current) {
      console.log("⏸️ Skipping auto-scroll: user is scrolling");
      return;
    }

    // 如果设置了只在接近底部时滚动，检查当前位置
    if (onlyWhenNearBottom && !isNearBottom()) {
      console.log("⏸️ Skipping auto-scroll: not near bottom");
      return;
    }

    console.log("✅ Executing auto-scroll to bottom");

    // 延迟一帧执行滚动，确保DOM已更新
    const timeoutId = setTimeout(() => {
      scrollToBottom();
    }, 50); // 增加一点延迟确保DOM完全更新

    return () => clearTimeout(timeoutId);
  }, [JSON.stringify(dependency), enabled, onlyWhenNearBottom, behavior]); // 使用JSON.stringify确保深度比较

  return {
    scrollRef,
    scrollToBottom,
    isNearBottom,
  };
}

/**
 * 简化版的聊天自动滚动Hook
 * 专门为聊天消息设计
 */
export function useChatAutoScroll(messages: any[]) {
  return useAutoScroll(messages, {
    enabled: true,
    behavior: "smooth",
    onlyWhenNearBottom: true,
    threshold: 100,
  });
}
