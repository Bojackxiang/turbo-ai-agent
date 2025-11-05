"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

interface SettingDeleteDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void | Promise<void>;
  onCancel: () => void;
  title?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  isLoading?: boolean;
}

const SettingDeleteDialog: React.FC<SettingDeleteDialogProps> = ({
  isOpen,
  onOpenChange,
  onConfirm,
  onCancel,
  title = "Delete Setting",
  description = "Are you sure you want to delete this setting? This action cannot be undone.",
  confirmText = "Delete",
  cancelText = "Cancel",
  isLoading = false,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] rounded-2xl border-0 shadow-2xl">
        <DialogHeader className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400">
              <Trash2 className="w-5 h-5" />
            </div>
            <DialogTitle className="text-xl font-semibold text-gray-900 dark:text-white">
              {title}
            </DialogTitle>
          </div>
          <DialogDescription className="text-gray-600 dark:text-gray-300 text-base leading-relaxed">
            {description}
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="flex flex-col sm:flex-row gap-3 pt-6">
          <Button
            variant="outline"
            onClick={onCancel}
            disabled={isLoading}
            className="rounded-xl border-2 hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors"
          >
            {cancelText}
          </Button>
          <Button
            variant="destructive"
            onClick={onConfirm}
            disabled={isLoading}
            className="rounded-xl font-medium transition-all duration-200 bg-red-600 hover:bg-red-700 text-white"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 mr-2 animate-spin border-2 border-white border-t-transparent rounded-full" />
                Deleting...
              </>
            ) : (
              confirmText
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SettingDeleteDialog;
