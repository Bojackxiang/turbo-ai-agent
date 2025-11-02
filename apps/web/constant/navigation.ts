import {
  InboxIcon,
  LibraryBigIcon,
  PaletteIcon,
  LayoutDashboardIcon,
  Mic,
  CreditCardIcon,
} from "lucide-react";

export const customerSupportItems = [
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

export const configurationItems = [
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

export const accountItems = [
  {
    title: "Plan & Billing",
    url: "/billing",
    icon: CreditCardIcon,
    description: "Manage your subscription and billing information",
    gradient: { from: "from-slate-600", to: "to-slate-700" },
  },
];
