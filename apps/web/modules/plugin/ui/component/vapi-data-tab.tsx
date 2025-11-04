"use client";

import { useVapiAssistants, useVapiNumbers } from "@/hooks/use-vapi-data";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Phone,
  Bot,
  MapPin,
  Calendar,
  CheckCircle2,
  Loader2,
} from "lucide-react";
import { Card } from "@/components/ui/card";

export const VapiDataTab = () => {
  const {
    data: phoneNumbers,
    loading: phoneLoading,
    error: phoneError,
  } = useVapiNumbers();

  const {
    data: vapiAssistants,
    loading: assistantLoading,
    error: assistantError,
  } = useVapiAssistants();

  return (
    <div className="max-w-7xl mx-auto">
      {/* Container with subtle background to create visual grouping */}
      <div className="relative rounded-xl sm:rounded-2xl bg-white/50 dark:bg-slate-900/50 p-3 sm:p-4 md:p-6 backdrop-blur-sm border border-slate-200 dark:border-slate-800 shadow-sm">
        {/* Decorative corner accents */}

        <Tabs defaultValue="phone-numbers" className="w-full relative z-10">
          {/* Tab List */}
          <TabsList className="grid w-full grid-cols-2 bg-slate-100 dark:bg-slate-800 p-1 rounded-lg sm:rounded-xl h-auto">
            <TabsTrigger
              value="phone-numbers"
              className="rounded-md sm:rounded-lg data-[state=active]:bg-white dark:data-[state=active]:bg-slate-900 data-[state=active]:shadow-md transition-all duration-200 py-2 sm:py-3 text-xs sm:text-sm font-semibold"
            >
              <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" />
              <span className="hidden xs:inline">Phone Numbers</span>
              <span className="xs:hidden">Phones</span>
              {phoneNumbers && (
                <span className="ml-1.5 sm:ml-2 px-1.5 sm:px-2 py-0.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-xs">
                  {phoneNumbers.length}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger
              value="assistants"
              className="rounded-md sm:rounded-lg data-[state=active]:bg-white dark:data-[state=active]:bg-slate-900 data-[state=active]:shadow-md transition-all duration-200 py-2 sm:py-3 text-xs sm:text-sm font-semibold"
            >
              <Bot className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" />
              <span className="hidden xs:inline">AI Assistants</span>
              <span className="xs:hidden">AI</span>
              {vapiAssistants && (
                <span className="ml-1.5 sm:ml-2 px-1.5 sm:px-2 py-0.5 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-xs">
                  {vapiAssistants.length}
                </span>
              )}
            </TabsTrigger>
          </TabsList>

          {/* Phone Numbers Tab Content */}
          <TabsContent value="phone-numbers" className="mt-4 sm:mt-6">
            {phoneLoading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-6 h-6 sm:w-8 sm:h-8 animate-spin text-blue-600" />
              </div>
            ) : phoneError ? (
              <div className="text-center py-12 text-red-600 text-sm sm:text-base">
                Error loading phone numbers
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
                {phoneNumbers?.map((phone: any) => (
                  <Card
                    key={phone.id}
                    className="group relative overflow-hidden border-0 bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-800 shadow-md hover:shadow-xl transition-all duration-300"
                  >
                    {/* Decorative gradient */}
                    <div className="absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-br from-blue-500 to-blue-600 opacity-5 blur-3xl rounded-full transform translate-x-12 sm:translate-x-16 -translate-y-12 sm:-translate-y-16 group-hover:opacity-10 transition-opacity duration-500" />

                    <div className="relative p-4 sm:p-5 md:p-6">
                      {/* Header */}
                      <div className="flex items-start justify-between mb-3 sm:mb-4 gap-2">
                        <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg flex-shrink-0">
                            <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-base sm:text-lg md:text-xl font-bold text-slate-900 dark:text-white truncate">
                              {phone.number}
                            </p>
                            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 truncate">
                              Provider: {phone.provider}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1 sm:py-1 rounded-full bg-green-100 dark:bg-green-900/30 border border-green-200 dark:border-green-800 flex-shrink-0">
                          <CheckCircle2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-green-600 dark:text-green-400" />
                          <span className="text-xs font-medium text-green-700 dark:text-green-300">
                            {phone.status}
                          </span>
                        </div>
                      </div>

                      {/* Details */}
                      <div className="space-y-2 sm:space-y-2.5">
                        <div className="flex items-center gap-2 text-xs sm:text-sm">
                          <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-400 flex-shrink-0" />
                          <span className="text-slate-600 dark:text-slate-400 truncate">
                            Created:{" "}
                            {new Date(phone.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-xs sm:text-sm">
                          <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-400 flex-shrink-0" />
                          <span className="text-slate-600 dark:text-slate-400 font-mono text-xs truncate">
                            ID: {phone.id.substring(0, 8)}...
                          </span>
                        </div>
                      </div>

                      {/* Bottom decorative line */}
                      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>
                  </Card>
                ))}
              </div>
            )}

            {!phoneLoading && phoneNumbers?.length === 0 && (
              <div className="text-center py-12">
                <Phone className="w-10 h-10 sm:w-12 sm:h-12 mx-auto text-slate-300 dark:text-slate-700 mb-3" />
                <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400">
                  No phone numbers found
                </p>
              </div>
            )}
          </TabsContent>

          {/* Assistants Tab Content */}
          <TabsContent value="assistants" className="mt-4 sm:mt-6">
            {assistantLoading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-6 h-6 sm:w-8 sm:h-8 animate-spin text-purple-600" />
              </div>
            ) : assistantError ? (
              <div className="text-center py-12 text-red-600 text-sm sm:text-base">
                Error loading assistants
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-3 sm:gap-4">
                {vapiAssistants?.map((assistant: any) => (
                  <Card
                    key={assistant.id}
                    className="group relative overflow-hidden border-0 bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-800 shadow-md hover:shadow-xl transition-all duration-300"
                  >
                    {/* Decorative gradient */}
                    <div className="absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-br from-purple-500 to-purple-600 opacity-5 blur-3xl rounded-full transform translate-x-12 sm:translate-x-16 -translate-y-12 sm:-translate-y-16 group-hover:opacity-10 transition-opacity duration-500" />

                    <div className="relative p-4 sm:p-5 md:p-6">
                      {/* Responsive layout - stack on mobile, row on tablet+ */}
                      <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6">
                        {/* Left: Icon + Name */}
                        <div className="flex items-center gap-3 sm:gap-4 min-w-0 flex-shrink-0 w-full md:w-auto">
                          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg sm:rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center shadow-lg flex-shrink-0">
                            <Bot className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <h3 className="text-base sm:text-lg md:text-xl font-bold text-slate-900 dark:text-white truncate">
                              {assistant.name}
                            </h3>
                            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                              AI Voice Assistant
                            </p>
                          </div>
                        </div>

                        {/* Middle: Key Info */}
                        <div className="flex-1 min-w-0 space-y-2 w-full md:w-auto">
                          <div className="flex items-start gap-2">
                            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex-shrink-0">
                              First Message:
                            </span>
                            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 line-clamp-2">
                              {assistant.firstMessage}
                            </p>
                          </div>
                          <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs text-slate-500 dark:text-slate-400">
                            <span className="truncate">
                              Model: {assistant.model?.model || "N/A"}
                            </span>
                            <span className="hidden sm:inline">•</span>
                            <span className="truncate">
                              Voice: {assistant.voice?.voiceId || "N/A"}
                            </span>
                            <span className="hidden sm:inline">•</span>
                            <span className="truncate">
                              Created:{" "}
                              {new Date(
                                assistant.createdAt
                              ).toLocaleDateString()}
                            </span>
                          </div>
                        </div>

                        {/* Right: Details */}
                        <div className="flex flex-row md:flex-col gap-2 flex-shrink-0">
                          <div className="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg bg-purple-100 dark:bg-purple-900/30 border border-purple-200 dark:border-purple-800">
                            <span className="text-xs font-medium text-purple-700 dark:text-purple-300">
                              {assistant.model?.provider || "OpenAI"}
                            </span>
                          </div>
                          <div className="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg bg-blue-100 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800">
                            <span className="text-xs font-medium text-blue-700 dark:text-blue-300">
                              {assistant.transcriber?.language || "en"}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Bottom decorative line */}
                      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>
                  </Card>
                ))}
              </div>
            )}

            {!assistantLoading && vapiAssistants?.length === 0 && (
              <div className="text-center py-12">
                <Bot className="w-10 h-10 sm:w-12 sm:h-12 mx-auto text-slate-300 dark:text-slate-700 mb-3" />
                <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400">
                  No assistants found
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
