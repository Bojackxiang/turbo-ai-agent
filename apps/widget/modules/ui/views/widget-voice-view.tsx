"use client";

import { vapiSecretItem } from "@/modules/atoms/widget-atoms";
import { useVapi } from "@/modules/hooks/use-vapi";
import { useAtomValue } from "jotai";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Mic,
  MicOff,
  Phone,
  PhoneOff,
  Volume2,
  VolumeX,
  MessageCircle,
  Loader2,
} from "lucide-react";
import { useState, useEffect } from "react";
import { error } from "@repo/backend/convex/utils/logger";

const WidgetVoiceView = () => {
  const secret = useAtomValue(vapiSecretItem);
  const [isMuted, setIsMuted] = useState(false);
  const [showTranscript, setShowTranscript] = useState(false);

  const {
    isConnected,
    isConnecting,
    isSpeaking,
    transcript,
    startCall,
    endCall,
  } = useVapi({ publicVapiKey: secret?.publicApiKey });

  console.log(transcript);

  // Auto-scroll transcript to bottom
  useEffect(() => {
    if (showTranscript && transcript.length > 0) {
      const transcriptContainer = document.getElementById(
        "transcript-container"
      );
      if (transcriptContainer) {
        transcriptContainer.scrollTop = transcriptContainer.scrollHeight;
      }
    }
  }, [transcript, showTranscript]);

  const handleCallToggle = () => {
    if (isConnected) {
      endCall();
    } else {
      startCall();
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // Call timer
  const [callDuration, setCallDuration] = useState(0);
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isConnected) {
      interval = setInterval(() => {
        setCallDuration((prev) => prev + 1);
      }, 1000);
    } else {
      setCallDuration(0);
    }
    return () => clearInterval(interval);
  }, [isConnected]);

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-background via-blue-50/30 to-blue-100/20">
      {/* Header */}
      <div className="flex-shrink-0 p-6 border-b border-blue-200/30 bg-gradient-to-r from-transparent to-blue-50/20">
        <div className="text-center">
          <h2 className="text-2xl font-semibold bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent mb-2">
            AI Voice Assistant
          </h2>

          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            {isConnected && (
              <>
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse shadow-sm shadow-blue-300"></div>
                <span className="text-blue-600 font-medium">
                  Connected • {formatTime(callDuration)}
                </span>
              </>
            )}
            {isConnecting && (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-blue-500" />
                <span className="text-blue-600">Connecting...</span>
              </>
            )}
            {!isConnected && !isConnecting && (
              <span>Ready to start conversation</span>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Voice Visualization Area */}
        <div className="flex-1 flex flex-col">
          {/* Voice Circle and Visual */}
          <div className="flex-1 flex items-center justify-center p-8 relative">
            {/* Background decoration */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-transparent to-blue-500/5 rounded-full"></div>

            <div className="relative">
              {/* Outer pulse ring for speaking */}
              {isSpeaking && (
                <div className="absolute inset-0 rounded-full bg-blue-400/30 animate-ping"></div>
              )}

              {/* Middle ring for connected state */}
              {isConnected && (
                <div className="absolute inset-0 rounded-full bg-blue-500/20 animate-pulse"></div>
              )}

              {/* Main voice circle */}
              <div
                className={cn(
                  "relative w-32 h-32 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg",
                  isConnected
                    ? "bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-blue-500/30"
                    : "bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200 text-blue-500 shadow-blue-200/50",
                  isSpeaking && "scale-110 shadow-xl shadow-blue-500/40"
                )}
              >
                {isConnecting ? (
                  <Loader2 className="w-12 h-12 animate-spin text-blue-500" />
                ) : (
                  <Mic
                    className={cn(
                      "w-12 h-12 transition-transform duration-200",
                      isMuted && "opacity-50"
                    )}
                  />
                )}
              </div>

              {/* Speaking indicator waves */}
              {isSpeaking && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className="w-1 bg-blue-400 rounded-full animate-bounce shadow-sm"
                        style={{
                          height: `${20 + Math.random() * 20}px`,
                          animationDelay: `${i * 100}ms`,
                          animationDuration: "1s",
                        }}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Real-time Conversation Display */}
          {isConnected && transcript.length > 0 && (
            <div className="flex-shrink-0 p-4 bg-white/80 backdrop-blur-sm border-t border-blue-200/30">
              <div className="max-w-2xl mx-auto">
                <h3 className="text-sm font-medium text-blue-600 mb-3 flex items-center gap-2">
                  <MessageCircle className="w-4 h-4" />
                  Live Conversation
                </h3>
                <div className="space-y-2 max-h-32 overflow-y-auto">
                  {transcript.slice(-3).map((message, index) => (
                    <div
                      key={transcript.length - 3 + index}
                      className={cn(
                        "flex items-start gap-3 p-2 rounded-lg transition-all duration-200",
                        message.role === "user"
                          ? "bg-blue-50 border-l-4 border-blue-400"
                          : "bg-gray-50 border-l-4 border-gray-400"
                      )}
                    >
                      <div
                        className={cn(
                          "flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium",
                          message.role === "user"
                            ? "bg-blue-500 text-white"
                            : "bg-gray-500 text-white"
                        )}
                      >
                        {message.role === "user" ? "U" : "AI"}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-gray-800 leading-relaxed">
                          {message.text}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                {transcript.length > 3 && (
                  <div className="mt-2 text-center">
                    <span className="text-xs text-blue-500">
                      Showing last 3 messages • {transcript.length} total
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Full Transcript Section */}
        {transcript.length > 0 && (
          <div className="border-t border-blue-200/30 bg-gradient-to-r from-blue-50/30 to-transparent">
            <div className="p-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowTranscript(!showTranscript)}
                className="w-full justify-between hover:bg-blue-50 border border-blue-200/50"
              >
                <div className="flex items-center gap-2">
                  <MessageCircle className="w-4 h-4 text-blue-500" />
                  <span className="text-blue-600 font-medium">
                    Full Conversation History ({transcript.length} messages)
                  </span>
                </div>
                <span className="text-xs text-blue-500">
                  {showTranscript ? "Hide" : "Show All"}
                </span>
              </Button>

              {showTranscript && (
                <div
                  id="transcript-container"
                  className="mt-4 max-h-48 overflow-y-auto space-y-3 p-3 bg-blue-50/30 rounded-lg border border-blue-200/50"
                >
                  {transcript.map((message, index) => (
                    <div
                      key={index}
                      className={cn(
                        "flex",
                        message.role === "user"
                          ? "justify-end"
                          : "justify-start"
                      )}
                    >
                      <div
                        className={cn(
                          "max-w-[80%] px-3 py-2 rounded-lg text-sm shadow-sm",
                          message.role === "user"
                            ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white ml-4 shadow-blue-200"
                            : "bg-white border border-blue-100 text-gray-700 mr-4 shadow-blue-100/50"
                        )}
                      >
                        <div
                          className={cn(
                            "text-xs mb-1",
                            message.role === "user"
                              ? "text-blue-100"
                              : "text-blue-500 font-medium"
                          )}
                        >
                          {message.role === "user" ? "You" : "Assistant"}
                        </div>
                        {message.text}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Controls */}
        <div className="flex-shrink-0 p-6 border-t border-blue-200/30 bg-gradient-to-r from-blue-50/20 to-transparent">
          <div className="flex items-center justify-center gap-4">
            {/* Mute/Unmute Button */}
            <Button
              variant="outline"
              size="icon"
              onClick={() => setIsMuted(!isMuted)}
              disabled={!isConnected}
              className={cn(
                "w-12 h-12 rounded-full transition-all duration-200 border-blue-200 hover:bg-blue-50",
                isMuted &&
                  "bg-red-50 text-red-500 border-red-300 hover:bg-red-100"
              )}
            >
              {isMuted ? (
                <VolumeX className="w-5 h-5" />
              ) : (
                <Volume2 className="w-5 h-5 text-blue-500" />
              )}
            </Button>

            {/* Main Call Button */}
            <Button
              onClick={handleCallToggle}
              disabled={isConnecting}
              size="lg"
              className={cn(
                "w-16 h-16 rounded-full transition-all duration-300 shadow-lg",
                isConnected
                  ? "bg-gradient-to-br from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-red-300"
                  : "bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-blue-300 hover:shadow-xl hover:shadow-blue-400/50 hover:scale-105"
              )}
            >
              {isConnecting ? (
                <Loader2 className="w-6 h-6 animate-spin" />
              ) : isConnected ? (
                <PhoneOff className="w-6 h-6" />
              ) : (
                <Phone className="w-6 h-6" />
              )}
            </Button>

            {/* Microphone Toggle */}
            <Button
              variant="outline"
              size="icon"
              onClick={() => {
                /* Add mic toggle logic if needed */
              }}
              disabled={!isConnected}
              className="w-12 h-12 rounded-full border-blue-200 hover:bg-blue-50"
            >
              <Mic className="w-5 h-5 text-blue-500" />
            </Button>
          </div>

          {/* Status Text */}
          <div className="text-center mt-4">
            <p className="text-sm">
              {isConnecting && (
                <span className="text-blue-600 font-medium">
                  Connecting to AI assistant...
                </span>
              )}
              {isConnected && !isSpeaking && (
                <span className="text-blue-600 font-medium">
                  Listening... Speak now
                </span>
              )}
              {isConnected && isSpeaking && (
                <span className="text-blue-600 font-medium">
                  AI is speaking...
                </span>
              )}
              {!isConnected && !isConnecting && (
                <span className="text-muted-foreground">
                  Tap the blue phone icon to start
                </span>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WidgetVoiceView;
