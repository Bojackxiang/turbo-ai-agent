"use client";

import { api } from "@repo/backend/convex/_generated/api";

import { useQuery } from "convex/react";
import { useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

export default function TestAuth() {
  const { user, isSignedIn } = useUser();

  // Test Convex connection - query user data
  const users = useQuery(api.user.getMany);

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">Authentication Test</h1>

      <div className="space-y-4">
        <div className="p-4 border rounded">
          <h2 className="text-lg font-semibold">Clerk Status</h2>
          <p>Signed In: {isSignedIn ? "Yes" : "No"}</p>
          {user && <p>User: {user.emailAddresses[0]?.emailAddress}</p>}
        </div>

        <div className="p-4 border rounded">
          <h2 className="text-lg font-semibold">Convex Connection</h2>
          <p>Status: {users === undefined ? "Loading..." : "Connected"}</p>
          {users && <p>Users count: {users.length}</p>}
        </div>

        <Button variant="default">Test Button from @repo/ui</Button>
      </div>
    </div>
  );
}
