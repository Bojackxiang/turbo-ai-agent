"use client";

import { useAuth, useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";

interface TokenInfo {
  defaultToken: string;
  convexToken: string;
  payload: Record<string, unknown>;
  hasConvexTemplate: boolean;
}

export default function DebugAuth() {
  const { getToken, isLoaded, userId } = useAuth();
  const { user } = useUser();
  const [tokenInfo, setTokenInfo] = useState<TokenInfo | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getTokenInfo = async () => {
      if (!isLoaded) return;

      try {
        // 获取 Clerk 的默认 JWT
        const defaultToken = await getToken();

        // 尝试获取 convex template 的 JWT
        const convexToken = await getToken({ template: "convex" });

        if (defaultToken) {
          // 解析 JWT payload (注意：这只是 base64 解码，不验证签名)
          const parts = defaultToken.split(".");
          const payload = parts[1] ? JSON.parse(atob(parts[1])) : {};
          setTokenInfo({
            defaultToken: defaultToken.substring(0, 50) + "...",
            convexToken: convexToken
              ? convexToken.substring(0, 50) + "..."
              : "No convex template",
            payload: payload,
            hasConvexTemplate: !!convexToken,
          });
        }
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      }
    };

    getTokenInfo();
  }, [isLoaded, getToken, userId]);

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">
        Clerk + Convex Debug Information
      </h1>

      <div className="space-y-6">
        <div className="bg-gray-100 p-4 rounded">
          <h2 className="text-lg font-semibold mb-2">User Info</h2>
          <p>
            <strong>User ID:</strong> {userId || "Not signed in"}
          </p>
          <p>
            <strong>Email:</strong>{" "}
            {user?.primaryEmailAddress?.emailAddress || "N/A"}
          </p>
        </div>

        <div className="bg-blue-50 p-4 rounded">
          <h2 className="text-lg font-semibold mb-2">Token Information</h2>
          {tokenInfo ? (
            <div className="space-y-2">
              <p>
                <strong>Has Convex Template:</strong>{" "}
                {tokenInfo.hasConvexTemplate ? "✅ Yes" : "❌ No"}
              </p>
              <p>
                <strong>Default Token:</strong> {tokenInfo.defaultToken}
              </p>
              <p>
                <strong>Convex Token:</strong> {tokenInfo.convexToken}
              </p>

              <div className="mt-4">
                <h3 className="font-medium mb-2">
                  JWT Payload (Default Token):
                </h3>
                <pre className="bg-white p-2 rounded text-xs overflow-x-auto">
                  {JSON.stringify(tokenInfo.payload, null, 2)}
                </pre>
              </div>
            </div>
          ) : (
            <p>No token information available</p>
          )}
        </div>

        {error && (
          <div className="bg-red-50 p-4 rounded">
            <h2 className="text-lg font-semibold mb-2 text-red-700">Error</h2>
            <p className="text-red-600">{error}</p>
          </div>
        )}

        <div className="bg-yellow-50 p-4 rounded">
          <h2 className="text-lg font-semibold mb-2">Expected Configuration</h2>
          <p>
            <strong>Issuer (iss):</strong>{" "}
            https://possible-shrew-68.clerk.accounts.dev
          </p>
          <p>
            <strong>Audience (aud):</strong> convex
          </p>
          <p>
            <strong>Convex Domain:</strong>{" "}
            https://possible-shrew-68.clerk.accounts.dev
          </p>
          <p>
            <strong>Convex App ID:</strong> convex
          </p>
        </div>
      </div>
    </div>
  );
}
