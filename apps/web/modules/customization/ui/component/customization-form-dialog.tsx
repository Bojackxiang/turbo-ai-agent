"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Settings } from "lucide-react";
import CustomizationForm from "./customization-form";

interface CustomizationFormDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: any) => void | Promise<void>;
  onCancel: () => void;
  defaultValues?: {
    greetingMessage: string;
    suggestions1: string;
    suggestions2: string;
    suggestions3: string;
    assistantId: string;
    phoneNumber: string;
  };
  isEditing?: boolean;
}

const CustomizationFormDialog: React.FC<CustomizationFormDialogProps> = ({
  isOpen,
  onOpenChange,
  onSubmit,
  onCancel,
  defaultValues,
  isEditing = false,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto rounded-2xl border-0 shadow-2xl">
        <DialogHeader className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
              <Settings className="w-5 h-5 text-white" />
            </div>
            <DialogTitle className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white">
              {isEditing ? "Update Widget Settings" : "Create Widget Settings"}
            </DialogTitle>
          </div>
          <DialogDescription className="text-gray-600 dark:text-gray-300 text-sm sm:text-base leading-relaxed">
            {isEditing
              ? "Modify your chat widget configuration, including greetings, quick suggestions, and VAPI integration settings."
              : "Set up your chat widget with a personalized greeting, quick suggestions, and VAPI integration to get started."}
          </DialogDescription>
        </DialogHeader>

        {/* Form Component */}
        <div className="mt-4">
          <CustomizationForm
            onSubmit={onSubmit}
            onCancel={onCancel}
            defaultValues={defaultValues}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CustomizationFormDialog;
