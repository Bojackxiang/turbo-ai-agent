import React from "react";

const AuthorizedView = () => {
  return (
    <main className="flex-1 overflow-auto p-6 space-y-6">
      <div className="bg-blue-600 text-white p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-2">Widget Application</h1>
      </div>

      <div className="bg-purple-200 text-gray-800 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-3">Beautiful Colors</h2>
        <p className="text-base">This widget uses a modern color scheme!</p>
      </div>

      <div className="bg-green-200 text-gray-800 p-6 rounded-lg">
        <h3 className="text-lg font-medium mb-2">Accent Section</h3>
        <p className="text-base">Vibrant accent color for highlights</p>
      </div>

      <div className="bg-gray-200 text-gray-700 p-6 rounded-lg">
        <h4 className="text-base font-medium mb-2">Muted Section</h4>
        <p className="text-sm">
          Subtle muted colors for less important content
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white text-gray-800 p-4 rounded-lg border border-gray-200">
          <h5 className="font-semibold mb-2">Card 1</h5>
          <p className="text-sm">Some card content here</p>
        </div>
        <div className="bg-white text-gray-800 p-4 rounded-lg border border-gray-200">
          <h5 className="font-semibold mb-2">Card 2</h5>
          <p className="text-sm">More content to demonstrate layout</p>
        </div>
      </div>

      {Array.from({ length: 5 }, (_, i) => (
        <div key={i} className="bg-gray-100 p-4 rounded-lg">
          <p className="text-sm text-gray-700">
            Additional content block {i + 1} - This demonstrates the scrollable
            content area
          </p>
        </div>
      ))}
    </main>
  );
};

export default AuthorizedView;
