"use client";

import React, { useState, useCallback } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Loader2 } from "lucide-react";

interface ActionWithConfirmProps<T extends any[] = []> {
  children: React.ReactNode;
  title?: string | ((...args: T) => string);
  description?: string | ((...args: T) => string);
  confirmText?: string;
  cancelText?: string;
  variant?: "default" | "destructive";
  onConfirm: (...args: T) => Promise<void> | void;
  disabled?: boolean;
  // For actions with parameters, you need to provide the args when triggering
  actionArgs?: T;
}

function ActionWithConfirm<T extends any[] = []>({
  children,
  title = "Are you sure?",
  description = "This action cannot be undone.",
  confirmText = "Confirm",
  cancelText = "Cancel",
  variant = "destructive",
  onConfirm,
  disabled = false,
  actionArgs,
}: ActionWithConfirmProps<T>) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [pendingArgs, setPendingArgs] = useState<T | null>(null);

  const handleConfirm = useCallback(async () => {
    try {
      setIsLoading(true);
      const args = (pendingArgs || actionArgs || []) as T;
      await onConfirm(...args);
      setIsOpen(false);
      setPendingArgs(null);
    } catch (error) {
      console.error("Action failed:", error);
      // You can add toast notification here if needed
    } finally {
      setIsLoading(false);
    }
  }, [onConfirm, pendingArgs, actionArgs]);

  const handleCancel = useCallback(() => {
    setIsOpen(false);
    setPendingArgs(null);
  }, []);

  const handleTriggerClick = useCallback(
    (...args: any[]) => {
      if (args.length > 0) {
        setPendingArgs(args as T);
      } else if (actionArgs) {
        setPendingArgs(actionArgs);
      }
      setIsOpen(true);
    },
    [actionArgs]
  );

  const triggerElement = React.cloneElement(
    children as React.ReactElement<any>,
    {
      onClick: handleTriggerClick,
      disabled: disabled,
    }
  );

  // Resolve dynamic title and description
  const currentArgs = pendingArgs || actionArgs || [];
  const resolvedTitle =
    typeof title === "function" ? title(...(currentArgs as T)) : title;

  const resolvedDescription =
    typeof description === "function"
      ? description(...(currentArgs as T))
      : description;

  return (
    <>
      {triggerElement}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[425px] rounded-2xl border-0 shadow-2xl">
          <DialogHeader className="space-y-4">
            <div className="flex items-center gap-3">
              <div
                className={`p-2 rounded-full ${
                  variant === "destructive"
                    ? "bg-red-100 text-red-600"
                    : "bg-blue-100 text-blue-600"
                }`}
              >
                <AlertTriangle className="w-5 h-5" />
              </div>
              <DialogTitle className="text-xl font-semibold text-gray-900">
                {resolvedTitle}
              </DialogTitle>
            </div>
            <DialogDescription className="text-gray-600 text-base leading-relaxed">
              {resolvedDescription}
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="flex flex-col sm:flex-row gap-3 pt-6">
            <Button
              variant="outline"
              onClick={handleCancel}
              disabled={isLoading}
              className="rounded-xl border-2 hover:bg-gray-50 transition-colors"
            >
              {cancelText}
            </Button>
            <Button
              variant={variant}
              onClick={handleConfirm}
              disabled={isLoading}
              className={`rounded-xl font-medium transition-all duration-200 ${
                variant === "destructive"
                  ? "bg-red-600 hover:bg-red-700 text-white"
                  : "bg-blue-600 hover:bg-blue-700 text-white"
              }`}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Processing...
                </>
              ) : (
                confirmText
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default ActionWithConfirm;
