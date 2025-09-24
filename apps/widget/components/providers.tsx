"use client";

import { ConvexProvider, ConvexReactClient } from "convex/react";

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL || "");

export const Providers = ({ children }: React.PropsWithChildren) => {
  return <ConvexProvider client={convex}>{children}</ConvexProvider>;
};
