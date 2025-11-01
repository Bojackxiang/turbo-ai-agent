"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Key, Lock, Sparkles, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// Form validation schema
const vapiFormSchema = z.object({
  publicKey: z.string().min(1, "Public key is required"),
  privateKey: z.string().min(1, "Private key is required"),
});

type VapiFormData = z.infer<typeof vapiFormSchema>;

interface VapiPluginApplyFormProps {
  onVapiApplyTriggered: (data: VapiFormData) => void | Promise<void>;
}

const VapiPluginApplyForm = ({
  onVapiApplyTriggered,
}: VapiPluginApplyFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<VapiFormData>({
    resolver: zodResolver(vapiFormSchema),
  });

  const onSubmit = async (data: VapiFormData) => {
    await onVapiApplyTriggered(data);
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="relative overflow-hidden rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl">
        {/* Header Section */}
        <div className="relative bg-gradient-to-r from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 p-8">
          {/* Background decoration */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
          </div>

          <div className="relative z-10 flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <Key className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white mb-1">
                Configure VAPI Credentials
              </h2>
              <p className="text-blue-100">
                Enter your API keys to connect your VAPI account
              </p>
            </div>
          </div>
        </div>

        {/* Form Section */}
        <form onSubmit={handleSubmit(onSubmit)} className="p-8">
          <div className="space-y-6">
            {/* Public Key Input */}
            <div className="space-y-2">
              <label
                htmlFor="publicKey"
                className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300"
              >
                <Key className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                Public Key
              </label>
              <div className="relative group">
                <Input
                  id="publicKey"
                  type="text"
                  placeholder="Enter your VAPI public key"
                  {...register("publicKey")}
                  className={`w-full h-12 px-4 rounded-xl border-2 transition-all duration-200 bg-slate-50 dark:bg-slate-800 ${
                    errors.publicKey
                      ? "border-red-300 dark:border-red-700 focus:border-red-500 dark:focus:border-red-500"
                      : "border-slate-200 dark:border-slate-700 focus:border-blue-500 dark:focus:border-blue-500 group-hover:border-slate-300 dark:group-hover:border-slate-600"
                  }`}
                />
                {!errors.publicKey && (
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Sparkles className="w-4 h-4 text-blue-400" />
                  </div>
                )}
              </div>
              {errors.publicKey && (
                <p className="text-sm text-red-600 dark:text-red-400 flex items-center gap-1">
                  <span className="w-1 h-1 rounded-full bg-red-600 dark:bg-red-400" />
                  {errors.publicKey.message}
                </p>
              )}
            </div>

            {/* Private Key Input */}
            <div className="space-y-2">
              <label
                htmlFor="privateKey"
                className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300"
              >
                <Lock className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                Private Key
              </label>
              <div className="relative group">
                <Input
                  id="privateKey"
                  type="password"
                  placeholder="Enter your VAPI private key"
                  {...register("privateKey")}
                  className={`w-full h-12 px-4 rounded-xl border-2 transition-all duration-200 bg-slate-50 dark:bg-slate-800 ${
                    errors.privateKey
                      ? "border-red-300 dark:border-red-700 focus:border-red-500 dark:focus:border-red-500"
                      : "border-slate-200 dark:border-slate-700 focus:border-blue-500 dark:focus:border-blue-500 group-hover:border-slate-300 dark:group-hover:border-slate-600"
                  }`}
                />
                {!errors.privateKey && (
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Sparkles className="w-4 h-4 text-blue-400" />
                  </div>
                )}
              </div>
              {errors.privateKey && (
                <p className="text-sm text-red-600 dark:text-red-400 flex items-center gap-1">
                  <span className="w-1 h-1 rounded-full bg-red-600 dark:bg-red-400" />
                  {errors.privateKey.message}
                </p>
              )}
            </div>

            {/* Security Notice */}
            <div className="flex items-start gap-3 p-4 rounded-xl bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900">
              <Lock className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm text-blue-800 dark:text-blue-300">
                  <span className="font-semibold">
                    Your credentials are secure.
                  </span>{" "}
                  All API keys are encrypted and stored safely in our database.
                </p>
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-12 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed group"
            >
              <span className="flex items-center justify-center gap-2">
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Connecting...
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    Connect VAPI Account
                  </>
                )}
              </span>
            </Button>
          </div>
        </form>

        {/* Footer Info */}
        <div className="px-8 pb-8">
          <div className="text-center text-sm text-slate-500 dark:text-slate-400">
            Don't have an API key?{" "}
            <a
              href="https://vapi.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium hover:underline"
            >
              Get started with VAPI →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VapiPluginApplyForm;
