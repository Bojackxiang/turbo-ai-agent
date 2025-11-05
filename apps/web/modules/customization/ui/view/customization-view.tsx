"use client";

import { useState } from "react";
import { Plus, Sparkles } from "lucide-react";
import { useQuery, useMutation } from "convex/react";
import { toast } from "sonner";

import { api } from "@repo/backend/convex/_generated/api";
import { Button } from "@/components/ui/button";
import { useActionWithConfirm } from "@/components/hooks/useActionWithConfirm";
import SectionHeader from "@/components/section-header";
import Header from "../component/header";
import CustomizationFormDialog from "../component/customization-form-dialog";
import SettingDeleteDialog from "../component/setting-delete-dialog";
import SettingCard from "../component/setting-card";
import EmptyState from "../component/empty-state";
import Loading from "../component/loading";

export const CustomizationView = () => {
  const widgetSettings = useQuery(api.private.widgetSettings.getOne);
  const removeWidgetSettings = useMutation(api.private.widgetSettings.remove);
  const upsert = useMutation(api.private.widgetSettings.upsert);
  const plugin = useQuery(api.private.plugin.getOne, { service: "vapi" });

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  // Handle form submission
  const handleFormSubmit = async (data: any) => {
    // Transform data to match the backend schema
    try {
      await upsert({
        greetingMessage: data.greetingMessage,
        defaultMessages: {
          suggestions1: data.suggestions1 || undefined,
          suggestions2: data.suggestions2 || undefined,
          suggestions3: data.suggestions3 || undefined,
        },
        vapiSettings: {
          assistantId: data.assistantId || undefined,
          phoneNumber: data.phoneNumber || undefined,
        },
      });

      // Close dialog on success
      setIsAddDialogOpen(false);
      toast.success("Form has been submitted");
    } catch (error) {
      console.error("Failed to save settings:", error);
      toast.error("Failed to save settings. Please try again.");
    }
  };

  // Handle dialog cancel
  const handleCancel = () => {
    setIsAddDialogOpen(false);
  };

  const onDelete = useActionWithConfirm({
    title: "Delete Customized Setting",
    description: `Are you sure you want to delete the configuration`,
    confirmText: "Delete",
    cancelText: "Cancel",
  });

  const onSettingsDelete = () => {
    if (widgetSettings) {
      onDelete.confirmAction(async () => {
        await removeWidgetSettings();
      });
    }
  };

  // Prepare default values for the form
  const formDefaultValues = widgetSettings
    ? {
        greetingMessage: widgetSettings.greetingMessage,
        suggestions1: widgetSettings.defaultMessages.suggestions1 || "",
        suggestions2: widgetSettings.defaultMessages.suggestions2 || "",
        suggestions3: widgetSettings.defaultMessages.suggestions3 || "",
        assistantId: widgetSettings.vapiSettings.assistantId || "",
        phoneNumber: widgetSettings.vapiSettings.phoneNumber || "",
      }
    : undefined;

  // Loading state
  if (widgetSettings === undefined) {
    return <Loading />;
  }

  return (
    <>
      {/* Delete Confirmation Dialog */}
      <SettingDeleteDialog
        isOpen={onDelete.isOpen}
        onOpenChange={(open) => {
          if (!open) onDelete.closeConfirmDialog();
        }}
        onConfirm={onDelete.handleConfirm}
        onCancel={onDelete.closeConfirmDialog}
        title={onDelete.title}
        description={onDelete.description}
        confirmText={onDelete.confirmText}
        cancelText={onDelete.cancelText}
        isLoading={onDelete.isLoading}
      />

      {/* Dialog for Add/Edit Widget Settings */}
      <CustomizationFormDialog
        isOpen={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        onSubmit={handleFormSubmit}
        onCancel={handleCancel}
        defaultValues={formDefaultValues}
        isEditing={!!widgetSettings}
      />

      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 p-3 sm:p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          <Header />

          {/* Add Button Section */}
          <div className="mb-6 sm:mb-8">
            <Button
              onClick={() => setIsAddDialogOpen(true)}
              className="group relative overflow-hidden bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white px-6 sm:px-8 py-5 sm:py-6 text-sm sm:text-base font-semibold rounded-xl border-0 shadow-lg hover:shadow-xl transition-all duration-300 w-full sm:w-auto"
            >
              {/* Button shine effect */}
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 group-hover:translate-x-full transition-all duration-700 -translate-x-full" />

              <span className="relative flex items-center justify-center gap-2">
                <Plus className="w-5 h-5" />
                {widgetSettings
                  ? "Update Widget Settings"
                  : "Create Widget Settings"}
                <Sparkles className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" />
              </span>
            </Button>
          </div>

          {/* Widget Settings List Section */}
          <div className="space-y-4 sm:space-y-6">
            <SectionHeader title="Customization Setting" />

            {/* Settings Content */}
            {!widgetSettings ? (
              <EmptyState
                onCreateClickHandler={() => setIsAddDialogOpen(true)}
              />
            ) : (
              // Settings Card
              <SettingCard
                settings={widgetSettings}
                onEdit={() => setIsAddDialogOpen(true)}
                onDelete={onSettingsDelete}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};
