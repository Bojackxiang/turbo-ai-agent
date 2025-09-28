"use client";

import { api } from "../../../../packages/backend/convex/_generated/api";
import { Authenticated, Unauthenticated, useQuery } from "convex/react";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import OrgGuard from "../../modules/auth/ui/components/org-guard";
import DashboardLayout from "@/modules/dashboard/layout/dashboard-layout";

export default function DashboardPage() {
  return <div>dashboard page</div>;
}
