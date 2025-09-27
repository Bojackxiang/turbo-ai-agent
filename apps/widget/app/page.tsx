"use client";

import { Button } from "@/components/ui/button";
import { useVapi } from "../modules/hooks/use-vapi";

export default function Home() {
  const {
    isConnected,
    isConnecting,
    isSpeaking,
    transcript,
    startCall,
    endCall,
  } = useVapi();

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Vapi AI Voice Assistant
          </h1>
          <p className="text-gray-600">
            Monitor and interact with your AI voice assistant
          </p>
        </div>

        {/* Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Connection Status */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">
                Connection
              </h3>
              <div
                className={`w-3 h-3 rounded-full ${
                  isConnected
                    ? "bg-green-500"
                    : isConnecting
                      ? "bg-yellow-500 animate-pulse"
                      : "bg-red-500"
                }`}
              />
            </div>
            <p className="text-2xl font-bold mt-2">
              {isConnected
                ? "Connected"
                : isConnecting
                  ? "Connecting..."
                  : "Disconnected"}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Current connection status
            </p>
          </div>

          {/* Speaking Status */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Speaking</h3>
              <div
                className={`w-3 h-3 rounded-full ${
                  isSpeaking ? "bg-blue-500 animate-pulse" : "bg-gray-300"
                }`}
              />
            </div>
            <p className="text-2xl font-bold mt-2">
              {isSpeaking ? "Active" : "Inactive"}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Voice activity detection
            </p>
          </div>

          {/* Transcript Count */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Messages</h3>
              <div className="text-blue-600">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
              </div>
            </div>
            <p className="text-2xl font-bold mt-2">{transcript.length}</p>
            <p className="text-sm text-gray-500 mt-1">
              Total transcript messages
            </p>
          </div>
        </div>

        {/* Control Panel */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Controls</h3>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              onClick={startCall}
              disabled={isConnected || isConnecting}
              className={`flex-1 ${
                isConnected || isConnecting
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700"
              }`}
            >
              {isConnecting ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                  Connecting...
                </div>
              ) : (
                "Start Call"
              )}
            </Button>

            <Button
              onClick={endCall}
              disabled={!isConnected}
              variant="outline"
              className={`flex-1 ${
                !isConnected
                  ? "border-gray-300 text-gray-400 cursor-not-allowed"
                  : "border-red-500 text-red-600 hover:bg-red-50"
              }`}
            >
              End Call
            </Button>
          </div>

          {/* Status Indicators */}
          <div className="mt-4 flex flex-wrap gap-2">
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                isConnected
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {isConnected ? "✓ Connected" : "✗ Disconnected"}
            </span>

            {isConnecting && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                🔄 Connecting
              </span>
            )}

            {isSpeaking && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                🎙️ Speaking
              </span>
            )}
          </div>
        </div>

        {/* Transcript Display */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">
                Conversation Transcript
              </h3>
              {transcript.length > 0 && (
                <button
                  onClick={() => window.location.reload()}
                  className="text-sm text-gray-500 hover:text-gray-700"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          <div className="p-6">
            {transcript.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <svg
                    className="w-16 h-16 mx-auto"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    />
                  </svg>
                </div>
                <p className="text-gray-500">No messages yet</p>
                <p className="text-sm text-gray-400 mt-1">
                  Start a call to see the conversation transcript
                </p>
              </div>
            ) : (
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {transcript.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${
                      message.role === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        message.role === "user"
                          ? "bg-blue-600 text-white"
                          : "bg-gray-100 text-gray-900"
                      }`}
                    >
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="text-xs font-medium opacity-75">
                          {message.role === "user" ? "You" : "Assistant"}
                        </span>
                      </div>
                      <p className="text-sm">{message.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Debug Information */}
        <div className="mt-8 bg-gray-800 rounded-lg shadow-sm border p-6">
          <h3 className="text-lg font-semibold text-white mb-4">
            Debug Information
          </h3>
          <pre className="text-xs text-gray-300 overflow-x-auto">
            {JSON.stringify(
              {
                isConnected,
                isConnecting,
                isSpeaking,
                transcriptCount: transcript.length,
                lastMessage: transcript[transcript.length - 1] || null,
              },
              null,
              2
            )}
          </pre>
        </div>
      </div>
    </div>
  );
}
