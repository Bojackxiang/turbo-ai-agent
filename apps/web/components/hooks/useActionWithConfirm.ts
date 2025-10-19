"use client";

import { useState, useCallback } from "react";

interface UseActionWithConfirmOptions {
  title?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
}

// 新的简洁版本 - 直接传递异步函数 ⭐️
export const useActionWithConfirm = (
  options: UseActionWithConfirmOptions = {}
) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [pendingAction, setPendingAction] = useState<
    (() => Promise<void> | void) | null
  >(null);

  const {
    title = "Are you sure?",
    description = "This action cannot be undone.",
    confirmText = "Confirm",
    cancelText = "Cancel",
  } = options;

  // 主要 API - 直接传递异步函数
  const confirmAction = useCallback((actionFn: () => Promise<void> | void) => {
    setPendingAction(() => actionFn);
    setIsOpen(true);
  }, []);

  const closeConfirmDialog = useCallback(() => {
    setIsOpen(false);
    setPendingAction(null);
  }, []);

  const handleConfirm = useCallback(async () => {
    if (!pendingAction) return;

    try {
      setIsLoading(true);
      await pendingAction();
      setIsOpen(false);
      setPendingAction(null);
    } catch (error) {
      console.error("Action failed:", error);
      // Keep dialog open on error so user can retry
    } finally {
      setIsLoading(false);
    }
  }, [pendingAction]);

  return {
    // 主要 API
    confirmAction,

    // Dialog 状态和控制
    isOpen,
    isLoading,
    title,
    description,
    confirmText,
    cancelText,
    closeConfirmDialog,
    handleConfirm,
  };
};
