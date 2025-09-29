"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "@repo/backend/convex/_generated/api";
import { useSearchParams } from "next/navigation";
import { Doc } from "@repo/backend/convex/_generated/dataModel";

// Zod schema for form validation
const formSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be less than 50 characters")
    .regex(/^[a-zA-Z\s]+$/, "Name can only contain letters and spaces"),
  email: z
    .string()
    .email("Please enter a valid email address")
    .min(5, "Email must be at least 5 characters")
    .max(100, "Email must be less than 100 characters"),
});

type FormData = z.infer<typeof formSchema>;

const WidgetAuthFormView = () => {
  const searchParams = useSearchParams();
  // TODO: 处理真实的 orgId
  // const orgId = searchParams.get("orgId");
  const orgId = "123";

  // Convex mutation hook
  const createConvexSession = useMutation(api.public.contact_session.create);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: "onChange", // Validate on change for better UX
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);

    try {
      const metadata: Doc<"contactSession">["metadata"] = {
        languages: navigator.languages?.join(","),
        userAgent: navigator.userAgent,
        language: navigator.language,
        platform: navigator.platform || "unknown",
        vender: (navigator as any).vendor || "unknown",
        screenResolution: `${screen.width}x${screen.height}`,
        viewportSize: `${window.innerWidth}x${window.innerHeight}`,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        timezoneOffset: new Date().getTimezoneOffset(),
        cookieEnabled: navigator.cookieEnabled,
        referrer: document.referrer || "direct",
        currentUtl: window.location.href,
      };

      await createConvexSession({
        name: data.name,
        email: data.email,
        orgId: orgId!,
        expiredAt: Date.now() + 24 * 60 * 60 * 1000, // 24小时后过期
        metadata: metadata,
      });

      reset(); // 清空表单
    } catch (error) {
      console.error("Form submission error:", error);
      alert("There was an error submitting the form. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-2xl shadow-xl border border-gray-100">
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Contact Form</h2>
        <p className="text-gray-600 text-sm">Please fill in your information</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Name Field */}
        <div className="space-y-2">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Full Name
          </label>
          <input
            {...register("name")}
            type="text"
            id="name"
            placeholder="Enter your full name"
            className={`w-full px-4 py-3 border rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 ${
              errors.name
                ? "border-red-300 focus:border-red-500 focus:ring-red-500/20"
                : "border-gray-200 focus:border-blue-500 focus:ring-blue-500/20"
            }`}
          />
          {errors.name && (
            <p className="text-red-500 text-sm flex items-center gap-1">
              <span>⚠️</span>
              {errors.name.message}
            </p>
          )}
        </div>

        {/* Email Field */}
        <div className="space-y-2">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email Address
          </label>
          <input
            {...register("email")}
            type="email"
            id="email"
            placeholder="Enter your email address"
            className={`w-full px-4 py-3 border rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 ${
              errors.email
                ? "border-red-300 focus:border-red-500 focus:ring-red-500/20"
                : "border-gray-200 focus:border-blue-500 focus:ring-blue-500/20"
            }`}
          />
          {errors.email && (
            <p className="text-red-500 text-sm flex items-center gap-1">
              <span>⚠️</span>
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={!isValid || isSubmitting}
          className={`w-full py-3 px-6 rounded-xl font-semibold text-white transition-all duration-300 ${
            !isValid || isSubmitting
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 hover:shadow-lg hover:shadow-blue-500/25 active:scale-95"
          }`}
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center gap-2">
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              Submitting...
            </span>
          ) : (
            "Submit Form"
          )}
        </button>
      </form>
    </div>
  );
};

export default WidgetAuthFormView;
