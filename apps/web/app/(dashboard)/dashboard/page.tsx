"use client";

import {
  InboxIcon,
  LibraryBigIcon,
  PaletteIcon,
  LayoutDashboardIcon,
  Mic,
  CreditCardIcon,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import Link from "next/link";

const customerSupportItems = [
  {
    title: "Conversations",
    url: "/conversations",
    icon: InboxIcon,
    description: "Manage customer conversations and support tickets",
    gradient: { from: "from-blue-500", to: "to-cyan-500" },
  },
  {
    title: "Knowledge Base",
    url: "/file",
    icon: LibraryBigIcon,
    description: "Upload and manage your knowledge base documents",
    gradient: { from: "from-purple-500", to: "to-pink-500" },
  },
];

const configurationItems = [
  {
    title: "Widget Customization",
    url: "/customization",
    icon: PaletteIcon,
    description: "Customize the appearance of your chat widget",
    gradient: { from: "from-orange-500", to: "to-red-500" },
  },
  {
    title: "Integrations",
    url: "/integrations",
    icon: LayoutDashboardIcon,
    description: "Connect with third-party services and tools",
    gradient: { from: "from-green-500", to: "to-emerald-500" },
  },
  {
    title: "Voice Assistant",
    url: "/plugins/vapi",
    icon: Mic,
    description: "Configure AI-powered voice calling features",
    gradient: { from: "from-indigo-500", to: "to-blue-500" },
  },
];

const accountItems = [
  {
    title: "Plan & Billing",
    url: "/billing",
    icon: CreditCardIcon,
    description: "Manage your subscription and billing information",
    gradient: { from: "from-slate-600", to: "to-slate-700" },
  },
];

interface NavigationCardProps {
  title: string;
  url: string;
  icon: React.ElementType;
  description: string;
  gradient: { from: string; to: string };
}

const NavigationCard = ({
  title,
  url,
  icon: Icon,
  description,
  gradient,
}: NavigationCardProps) => {
  return (
    <Link href={url} className="group block h-full">
      <div className="relative h-full overflow-hidden rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
        {/* Background Gradient */}
        <div
          className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${gradient.from} ${gradient.to} opacity-5 blur-3xl group-hover:opacity-10 transition-opacity duration-500`}
        />

        <div className="relative p-6">
          {/* Icon */}
          <div className="mb-4">
            <div
              className={`w-14 h-14 rounded-xl bg-gradient-to-br ${gradient.from} ${gradient.to} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}
            >
              <Icon className="w-7 h-7 text-white" />
            </div>
          </div>

          {/* Content */}
          <div className="mb-4">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {title}
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              {description}
            </p>
          </div>

          {/* Arrow */}
          <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-medium text-sm">
            <span>Go to {title}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </div>

          {/* Bottom decorative line */}
          <div
            className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${gradient.from} ${gradient.to} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
          />
        </div>
      </div>
    </Link>
  );
};

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-slate-900 dark:text-white">
                Dashboard
              </h1>
              <p className="text-slate-500 dark:text-slate-400 mt-1">
                Welcome back! Choose a section to get started
              </p>
            </div>
          </div>
        </div>

        {/* Customer Support Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
            <div className="w-1 h-6 bg-gradient-to-b from-blue-500 to-blue-600 rounded-full" />
            Customer Support
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {customerSupportItems.map((item) => (
              <NavigationCard key={item.url} {...item} />
            ))}
          </div>
        </section>

        {/* Configuration Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
            <div className="w-1 h-6 bg-gradient-to-b from-purple-500 to-purple-600 rounded-full" />
            Configuration
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {configurationItems.map((item) => (
              <NavigationCard key={item.url} {...item} />
            ))}
          </div>
        </section>

        {/* Account Section */}
        <section>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
            <div className="w-1 h-6 bg-gradient-to-b from-slate-500 to-slate-600 rounded-full" />
            Account
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {accountItems.map((item) => (
              <NavigationCard key={item.url} {...item} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
