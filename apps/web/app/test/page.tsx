"use client";

import { Button } from "@repo/ui";

export default function TestPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <header className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Shadcn/UI + Tailwind CSS Production Test
          </h1>
          <p className="text-lg text-gray-600">
            Testing @repo/ui components in production environment
          </p>
        </header>

        {/* Button Variants Test */}
        <section className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            Button Variants
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <Button variant="default">Default</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="link">Link</Button>
          </div>
        </section>

        {/* Button Sizes Test */}
        <section className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            Button Sizes
          </h2>
          <div className="flex flex-wrap items-center gap-4">
            <Button size="sm">Small</Button>
            <Button size="default">Default</Button>
            <Button size="lg">Large</Button>
            <Button size="icon">🚀</Button>
          </div>
        </section>

        {/* Tailwind CSS Test */}
        <section className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            Tailwind CSS Test
          </h2>
          <div className="space-y-4">
            <div className="p-4 bg-red-100 border-l-4 border-red-500 text-red-700">
              <p className="font-bold">Red Theme</p>
              <p>This should have red background and border</p>
            </div>
            <div className="p-4 bg-green-100 border-l-4 border-green-500 text-green-700">
              <p className="font-bold">Green Theme</p>
              <p>This should have green background and border</p>
            </div>
            <div className="p-4 bg-blue-100 border-l-4 border-blue-500 text-blue-700">
              <p className="font-bold">Blue Theme</p>
              <p>This should have blue background and border</p>
            </div>
          </div>
        </section>

        {/* Custom Button with Tailwind Classes */}
        <section className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            Custom Styled Buttons
          </h2>
          <div className="flex flex-wrap gap-4">
            <Button className="bg-purple-600 hover:bg-purple-700 text-white">
              Custom Purple
            </Button>
            <Button className="bg-orange-500 hover:bg-orange-600 text-white">
              Custom Orange
            </Button>
            <Button className="bg-pink-500 hover:bg-pink-600 text-white">
              Custom Pink
            </Button>
            <Button className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white">
              Gradient Button
            </Button>
          </div>
        </section>

        {/* Interactive Test */}
        <section className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            Interactive Test
          </h2>
          <div className="space-y-4">
            <Button
              onClick={() => alert("Production Button Click Test!")}
              className="w-full"
            >
              Click to Test Alert
            </Button>
            <Button
              variant="outline"
              onClick={() => console.log("Console log test in production")}
              className="w-full"
            >
              Click to Test Console Log
            </Button>
          </div>
        </section>

        <footer className="text-center text-gray-500">
          <p>
            If you can see all the colors, borders, and button styles correctly,
            then shadcn/ui + Tailwind CSS is working perfectly in production! 🎉
          </p>
        </footer>
      </div>
    </div>
  );
}
