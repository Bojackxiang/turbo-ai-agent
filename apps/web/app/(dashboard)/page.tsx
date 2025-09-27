"use client";

import { api } from "../../../../packages/backend/convex/_generated/api";
import { Authenticated, Unauthenticated, useQuery } from "convex/react";
import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { Organization } from "@clerk/nextjs/server";

const ThemeImage = () => {
  const users = useQuery(api.user.getMany);
  console.log("users: ", users);

  return (
    <div className="flex flex-col items-center justify-center w-full p-4">
      <div className="w-full max-w-2xl mx-auto text-center">
        <h3 className="text-lg font-semibold mb-4 text-gray-700">
          Convex Data:
        </h3>
        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
          <pre className="text-sm text-gray-800 whitespace-pre-wrap break-words text-left">
            {JSON.stringify(users, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Header */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-900">AI Client</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Authenticated>
                <Link
                  href="/test"
                  className="text-gray-600 hover:text-gray-900"
                >
                  Test Page
                </Link>
                <Link
                  href="/debug-auth"
                  className="text-gray-600 hover:text-gray-900"
                >
                  Debug Auth
                </Link>
                <UserButton />
              </Authenticated>
              <Unauthenticated>
                <Link
                  href="/sign-in"
                  className="text-gray-600 hover:text-gray-900"
                >
                  Sign In
                </Link>
                <Link
                  href="/sign-up"
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                >
                  Sign Up
                </Link>
              </Unauthenticated>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Authenticated>
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Welcome Back!
            </h2>
            <p className="text-lg text-gray-600">
              You are successfully logged in and connected to Convex database
            </p>
          </div>
          <ThemeImage />
          <OrganizationSwitcher hidePersonal={true} />
        </Authenticated>
        <Unauthenticated>
          <div className="text-center py-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Welcome to AI Client
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Please sign in to access full features
            </p>
            <div className="space-x-4">
              <Link
                href="/sign-in"
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 inline-block"
              >
                Sign In Now
              </Link>
              <Link
                href="/sign-up"
                className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300 inline-block"
              >
                Create Account
              </Link>
            </div>
          </div>
        </Unauthenticated>
      </main>
    </div>
  );
}
