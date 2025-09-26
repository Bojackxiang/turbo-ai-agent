"use client";

import { useAuth, useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import Link from "next/link";

interface TokenInfo {
  token: string;
  payload: {
    aud?: string;
    iss?: string;
    sub?: string;
    [key: string]: unknown;
  };
  success: boolean;
}

export default function JWTTestPage() {
  const { getToken, isLoaded, userId } = useAuth();
  const { user } = useUser();
  const [tokenInfo, setTokenInfo] = useState<TokenInfo | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getTokenInfo = async () => {
      if (!isLoaded || !userId) return;

      try {
        // 尝试获取 convex JWT 模板的 token
        const convexToken = await getToken({ template: "convex" });

        if (convexToken) {
          // 解析 JWT payload
          const parts = convexToken.split(".");
          const payload = parts[1] ? JSON.parse(atob(parts[1])) : {};

          setTokenInfo({
            token: convexToken.substring(0, 50) + "...",
            payload: payload,
            success: true,
          });
          setError(null);
        } else {
          setError("Cannot get convex JWT token");
        }
      } catch (err: unknown) {
        setError(`JWT Error: ${err instanceof Error ? err.message : 'Unknown error'}`);
        setTokenInfo(null);
      }
    };

    getTokenInfo();
  }, [isLoaded, getToken, userId]);

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!userId) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Please Sign In First</h1>
          <Link
            href="/sign-in"
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Sign In
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">JWT Template Test</h1>

      <div className="space-y-6">
        <div className="bg-gray-100 p-4 rounded">
          <h2 className="text-lg font-semibold mb-2">User Information</h2>
          <p>
            <strong>User ID:</strong> {userId}
          </p>
          <p>
            <strong>Email:</strong>{" "}
            {user?.primaryEmailAddress?.emailAddress || "N/A"}
          </p>
        </div>

        {error ? (
          <div className="bg-red-50 border border-red-200 p-4 rounded">
            <h2 className="text-lg font-semibold mb-2 text-red-700">
              ❌ JWT Template Error
            </h2>
            <p className="text-red-600">{error}</p>
            <div className="mt-4 p-3 bg-red-100 rounded">
              <h3 className="font-medium text-red-800 mb-2">
                Resolution Steps:
              </h3>
              <ol className="list-decimal list-inside text-red-700 space-y-1">
                <li>
                  Visit{" "}
                  <a
                    href="https://dashboard.clerk.com/"
                    className="underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Clerk Dashboard
                  </a>
                </li>
                <li>Select application &quot;possible-shrew-68&quot;</li>
                <li>Find &quot;JWT Templates&quot; menu</li>
                <li>Create new template named &quot;convex&quot;</li>
                <li>Add in Custom Claims: {`{"aud": "convex"}`}</li>
              </ol>
            </div>
          </div>
        ) : tokenInfo ? (
          <div className="bg-green-50 border border-green-200 p-4 rounded">
            <h2 className="text-lg font-semibold mb-2 text-green-700">
              ✅ JWT Template Working
            </h2>
            <div className="space-y-2">
              <p>
                <strong>Token (first 50 chars):</strong> {tokenInfo.token}
              </p>

              <div className="mt-4">
                <h3 className="font-medium mb-2">JWT Payload:</h3>
                <pre className="bg-white p-2 rounded text-xs overflow-x-auto border">
                  {JSON.stringify(tokenInfo.payload, null, 2)}
                </pre>
              </div>

              <div className="mt-4 p-3 bg-green-100 rounded">
                <h3 className="font-medium text-green-800 mb-2">
                  Verification Items:
                </h3>
                <ul className="space-y-1 text-green-700">
                  <li>✅ JWT template &quot;convex&quot; exists</li>
                  <li>
                    {tokenInfo.payload.aud === "convex" ? "✅" : "❌"} Audience
                    (aud) = &quot;convex&quot;
                  </li>
                  <li>
                    {tokenInfo.payload.iss?.includes("possible-shrew-68")
                      ? "✅"
                      : "❌"}{" "}
                    Issuer (iss) contains app domain
                  </li>
                  <li>
                    {tokenInfo.payload.sub ? "✅" : "❌"} Subject (sub) contains
                    user ID
                  </li>
                </ul>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-yellow-50 border border-yellow-200 p-4 rounded">
            <h2 className="text-lg font-semibold mb-2 text-yellow-700">
              ⏳ Checking JWT template...
            </h2>
          </div>
        )}

        <div className="bg-blue-50 p-4 rounded">
          <h2 className="text-lg font-semibold mb-2">Expected Configuration</h2>
          <div className="space-y-2 text-sm">
            <p>
              <strong>JWT Template Name:</strong> convex
            </p>
            <p>
              <strong>Convex Domain:</strong>{" "}
              https://possible-shrew-68.clerk.accounts.dev
            </p>
            <p>
              <strong>Convex App ID:</strong> convex
            </p>
            <p>
              <strong>Required Claims:</strong>
            </p>
            <pre className="bg-white p-2 rounded border">
              {`{
  "aud": "convex"
}`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
