"use client";

import { Phone, Zap, Info } from "lucide-react";
import PluginCard from "../component/PluginCard";
import { useMutation, useQuery } from "convex/react";
import { api } from "@repo/backend/convex/_generated/api";
import PluginNotFoundView from "./plugin-not-found-view";
import VapiPluginApplyForm from "./vapi-plugin-not-found";
const VapiViews = () => {
  const vapiPlugin = useQuery(api.private.plugin.getOne, { service: "vapi" });
  console.log("vapiPlugin: ", vapiPlugin);
  const upsert = useMutation(api.private.secret.create);
  const createPlugin = useMutation(api.private.plugin.create);

  const onButtonClick = async () => {
    // TODO: Implement VAPI service trigger logic
    console.log("VAPI service triggered");
    // Simulate async operation
    await new Promise((resolve) => setTimeout(resolve, 2000));
  };

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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 p-4 md:p-8">
      {/* Page Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg">
            <Phone className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-slate-900 dark:text-white">
              VAPI Integration
            </h1>
            <p className="text-slate-500 dark:text-slate-400 mt-1">
              Manage your voice AI and communication services
            </p>
          </div>
        </div>

        {/* Info Banner */}
        <div className="flex justify-center">
          <div className="max-w-3xl mt-6 p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 flex items-start gap-3">
            <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm text-blue-800 dark:text-blue-300">
                <span className="font-semibold">
                  VAPI (Voice AI Platform Integration)
                </span>{" "}
                allows you to trigger phone calls and workflow automations
                seamlessly.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Plugin Cards Grid */}
      <div className="max-w-3xl mx-auto flex justify-center">
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
          buttonText="Start Call"
          gradient={{ from: "from-blue-500", to: "to-blue-600" }}
        />
      </div>

      {/* Additional Services Section */}
      <div className="max-w-7xl mx-auto mt-8">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
          Coming Soon
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { name: "SMS Integration", icon: "💬", status: "In Development" },
            { name: "Email Automation", icon: "📧", status: "Planned" },
            { name: "Webhook Triggers", icon: "🔗", status: "Planned" },
          ].map((service, index) => (
            <div
              key={index}
              className="p-6 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 opacity-60 hover:opacity-100 transition-opacity duration-200"
            >
              <div className="text-4xl mb-3">{service.icon}</div>
              <h3 className="font-semibold text-slate-900 dark:text-white mb-1">
                {service.name}
              </h3>
              <span className="inline-block px-3 py-1 text-xs font-medium bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-full">
                {service.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VapiViews;
