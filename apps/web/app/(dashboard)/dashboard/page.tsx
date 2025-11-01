"use client";

import { api } from "@repo/backend/convex/_generated/api";
import { Authenticated, Unauthenticated, useQuery } from "convex/react";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";

export default function DashboardPage() {
  return <div className="bg-red-300">dashboard page</div>;
}
