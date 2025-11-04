"use client";

import { Phone, Zap, Info, AlertTriangle, Loader2 } from "lucide-react";
import PluginCard from "../component/PluginCard";
import { useMutation, useQuery } from "convex/react";
import { api } from "@repo/backend/convex/_generated/api";
import PluginNotFoundView from "./plugin-not-found-view";
import VapiPluginApplyForm from "./vapi-plugin-not-found";
import { useActionWithConfirm } from "@/components/hooks/useActionWithConfirm";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { VapiDataTab } from "../component/vapi-data-tab";
const VapiViews = () => {
  const vapiPlugin = useQuery(api.private.plugin.getOne, { service: "vapi" });

  const upsert = useMutation(api.private.secret.create);
  const createPlugin = useMutation(api.private.plugin.create);
  const removePlugin = useMutation(api.private.plugin.remove);
  const removeSecret = useMutation(api.private.secret.remove);

  const onButtonClick = async () => {
    // TODO: Implement VAPI service trigger logic
    console.log("VAPI service triggered");
    // Simulate async operation
    await new Promise((resolve) => setTimeout(resolve, 2000));
  };

  const onDelete = useActionWithConfirm({
    title: "Remove VAPI Plugin",
    description: `Are you sure you want to remove the VAPI plugin? This will disconnect your VAPI integration and delete all associated credentials. This action cannot be undone.`,
    confirmText: "Remove Plugin",
    cancelText: "Cancel",
  });

  const onVapiApplyTriggered = async (data: {
    publicKey: string;
    privateKey: string;
  }) => {
    await new Promise((resolve) => setTimeout(resolve, 3000));

    await upsert({
      serviceName: "vapi",
      privateKey: data.privateKey,
      publicKey: data.publicKey,
    });

    await createPlugin({
      serviceName: "vapi",
      service: "vapi",
    });
  };

  const onRemovePluginClicked = () => {
    onDelete.confirmAction(async () => {
      try {
        await removeSecret({ serviceName: "vapi" });
        await removePlugin({ service: "vapi" });
      } catch (error) {
        console.error("Failed to remove plugin:", error);
      }
    });
  };

  if (!vapiPlugin) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          <PluginNotFoundView message="VAPI account is not linked with your organization" />
          <VapiPluginApplyForm onVapiApplyTriggered={onVapiApplyTriggered} />
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Confirmation Dialog */}
      <Dialog open={onDelete.isOpen} onOpenChange={onDelete.closeConfirmDialog}>
        <DialogContent className="sm:max-w-[425px] rounded-2xl border-0 shadow-2xl">
          <DialogHeader className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <DialogTitle className="text-xl font-semibold text-gray-900 dark:text-white">
                {onDelete.title}
              </DialogTitle>
            </div>
            <DialogDescription className="text-gray-600 dark:text-gray-300 text-base leading-relaxed">
              {onDelete.description}
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="flex flex-col sm:flex-row gap-3 pt-6">
            <Button
              variant="outline"
              onClick={onDelete.closeConfirmDialog}
              disabled={onDelete.isLoading}
              className="rounded-xl border-2 hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors"
            >
              {onDelete.cancelText}
            </Button>
            <Button
              variant="destructive"
              onClick={onDelete.handleConfirm}
              disabled={onDelete.isLoading}
              className="rounded-xl font-medium bg-red-600 hover:bg-red-700 text-white transition-all duration-200"
            >
              {onDelete.isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Removing...
                </>
              ) : (
                onDelete.confirmText
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 p-3 sm:p-4 md:p-8">
        {/* Page Header */}
        <div className="max-w-7xl mx-auto mb-6 sm:mb-8">
          <div className="flex items-center gap-3 sm:gap-4 mb-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-xl sm:rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg flex-shrink-0">
              <Phone className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-white" />
            </div>
            <div className="min-w-0 flex-1">
              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white truncate">
                VAPI Integration
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5 sm:mt-1 line-clamp-1">
                Manage your voice AI and communication services
              </p>
            </div>
          </div>

          {/* Info Banner */}

          <div className="max-w-7xl mt-4 sm:mt-6 p-3 sm:p-4 rounded-lg sm:rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 flex items-start gap-2 sm:gap-3">
            <Info className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
            <div className="flex-1 min-w-0">
              <p className="text-xs sm:text-sm text-blue-800 dark:text-blue-300">
                <span className="font-semibold">
                  VAPI (Voice AI Platform Integration)
                </span>{" "}
                allows you to trigger phone calls and workflow automations
                seamlessly.
              </p>
            </div>
          </div>
        </div>

        {/* Plugin Cards Grid */}
        <div className="max-w-7xl mx-auto mb-8 sm:mb-10 md:mb-12">
          {/* VAPI Phone Call Card */}
          <PluginCard
            title="Voice Call Service"
            description="Trigger automated phone calls"
            messages={[
              {
                icon: Phone,
                message:
                  "Initiate voice calls to user's phone numbers with AI-powered conversations and real-time transcription.",
              },
              {
                icon: Zap,
                message:
                  "Fast and reliable connection with sub-second latency for natural conversations.",
              },
            ]}
            onServiceTrigger={onButtonClick}
            removePlugin={onRemovePluginClicked}
            buttonText="Start Call"
            gradient={{ from: "from-blue-500", to: "to-blue-600" }}
          />
        </div>

        {/* Visual Separator with Section Header */}
        <div className="max-w-7xl mx-auto mb-6 sm:mb-8">
          <div className="relative">
            {/* Decorative line with gradient */}
            <div
              className="absolute inset-0 flex items-center"
              aria-hidden="true"
            >
              <div className="w-full border-t-2 border-slate-300 dark:border-slate-700" />
            </div>
            <div className="relative flex justify-center">
              <div className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 px-4 sm:px-6 py-1.5 sm:py-2 rounded-full border-2 border-slate-200 dark:border-slate-700 shadow-lg">
                <h2 className="text-sm sm:text-base md:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-1.5 sm:gap-2">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 animate-pulse" />
                  <span className="whitespace-nowrap">VAPI Resources</span>
                </h2>
              </div>
            </div>
          </div>
        </div>

        {/* Phone numbers and assistants */}
        <VapiDataTab />
      </div>
    </>
  );
};

export default VapiViews;
