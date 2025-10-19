"use client";

import { api } from "@repo/backend/convex/_generated/api";
import { useAction, useMutation, usePaginatedQuery } from "convex/react";
import { _PublicFile } from "@repo/backend/convex/private/file";
import UploadDialog from "../../component/upload-dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  FileText,
  Download,
  Eye,
  MoreHorizontal,
  Search,
  Grid3X3,
  List,
  DeleteIcon,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { use, useState } from "react";
import { file } from "zod/v4";
import { useActionWithConfirm } from "@/components/hooks/useActionWithConfirm";

const FileView = ({ children }: React.PropsWithChildren) => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");

  const files = usePaginatedQuery(
    api.private.file.list,
    {},
    {
      initialNumItems: 10,
    }
  );

  const getFileIcon = (type: string) => {
    switch (type) {
      case "pdf":
        return <FileText className="w-8 h-8 text-red-500" />;
      default:
        return <FileText className="w-8 h-8 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ready":
        return "bg-green-100 text-green-800 border-green-200";
      case "processing":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "error":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const fileDelete = useMutation(api.private.file.deleteFile);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const onDelete = useActionWithConfirm({
    title: "Delete File",
    description: `Are you sure you want to delete this file? This action cannot be undone.`,
    confirmText: "Delete",
    cancelText: "Cancel",
  });

  const filteredFiles =
    files.results?.filter((file) =>
      file.name.toLowerCase().includes(searchQuery.toLowerCase())
    ) || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              File Manager
            </h1>
            <p className="text-gray-600 text-lg">Review your uploaded files</p>
          </div>

          <div className="flex items-center gap-4">
            <UploadDialog />
          </div>
        </div>

        {/* Search and Controls */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              placeholder="Search files..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 border-0 bg-gray-50 focus:bg-white transition-colors"
            />
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant={viewMode === "grid" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("grid")}
              className="rounded-xl"
            >
              <Grid3X3 className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("list")}
              className="rounded-xl"
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Files Grid/List */}
        {files.isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardContent className="p-6">
                  <div className="h-20 bg-gray-200 rounded-lg mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : filteredFiles.length > 0 ? (
          <div
            className={
              viewMode === "grid"
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                : "space-y-4"
            }
          >
            {filteredFiles.map((file) => {
              return (
                <Card
                  key={file.id}
                  className={`group hover:shadow-xl transition-all duration-300 border-0 shadow-lg hover:scale-[1.02] ${
                    viewMode === "list" ? "p-4" : ""
                  }`}
                >
                  <CardContent className={viewMode === "grid" ? "p-6" : "p-0"}>
                    {viewMode === "grid" ? (
                      <>
                        {/* Grid View */}
                        <div className="flex items-center justify-between mb-4">
                          <div className="p-3 bg-gray-50 rounded-2xl group-hover:bg-gray-100 transition-colors">
                            {getFileIcon(file.type)}
                          </div>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="opacity-0 group-hover:opacity-100 transition-opacity rounded-xl"
                              >
                                <MoreHorizontal className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                              align="end"
                              className="rounded-xl"
                            >
                              <DropdownMenuItem className="rounded-lg">
                                <Eye className="w-4 h-4 mr-2" />
                                Preview
                              </DropdownMenuItem>
                              <DropdownMenuItem className="rounded-lg">
                                <Download className="w-4 h-4 mr-2" />
                                Download
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                className="rounded-lg"
                                onClick={() =>
                                  onDelete.confirmAction(async () => {
                                    await fileDelete({ entryId: file.id });
                                  })
                                }
                              >
                                <DeleteIcon className="w-4 h-4 mr-2" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>

                        <div className="space-y-3">
                          <h3 className="font-semibold text-gray-900 truncate text-lg group-hover:text-blue-600 transition-colors">
                            {file.name}
                          </h3>

                          <div className="flex items-center justify-between">
                            <Badge
                              variant="secondary"
                              className={`rounded-full px-3 py-1 text-xs font-medium ${getStatusColor(file.status)}`}
                            >
                              {file.status === "ready" ? "Ready" : file.status}
                            </Badge>
                            <span className="text-sm text-gray-500 uppercase tracking-wide">
                              {file.type}
                            </span>
                          </div>

                          <div className="text-sm text-gray-500">
                            Size: {file.size || "Unknown"}
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        {/* List View */}
                        <div className="flex items-center gap-4 p-2">
                          <div className="p-2 bg-gray-50 rounded-xl">
                            {getFileIcon(file.type)}
                          </div>

                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-gray-900 truncate">
                              {file.name}
                            </h3>
                            <div className="flex items-center gap-4 mt-1">
                              <Badge
                                variant="secondary"
                                className={`rounded-full px-2 py-1 text-xs ${getStatusColor(file.status)}`}
                              >
                                {file.status === "ready"
                                  ? "Ready"
                                  : file.status}
                              </Badge>
                              <span className="text-sm text-gray-500">
                                {file.type.toUpperCase()}
                              </span>
                              <span className="text-sm text-gray-500">
                                {file.size || "Unknown"}
                              </span>
                            </div>
                          </div>

                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="rounded-xl"
                              >
                                <MoreHorizontal className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                              align="end"
                              className="rounded-xl"
                            >
                              <DropdownMenuItem className="rounded-lg">
                                <Eye className="w-4 h-4 mr-2" />
                                Preview
                              </DropdownMenuItem>
                              <DropdownMenuItem className="rounded-lg">
                                <Download className="w-4 h-4 mr-2" />
                                Download
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                className="rounded-lg"
                                onClick={() =>
                                  onDelete.confirmAction(async () => {
                                    await fileDelete({ entryId: file.id });
                                  })
                                }
                              >
                                <DeleteIcon className="w-4 h-4 mr-2" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-3xl flex items-center justify-center">
              <FileText className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {searchQuery ? "No files found" : "No files yet"}
            </h3>
            <p className="text-gray-600 mb-6">
              {searchQuery
                ? `No files found containing "${searchQuery}"`
                : "Upload your first file to get started"}
            </p>
            {!searchQuery && <UploadDialog />}
          </div>
        )}

        {/* Load More */}
        {files.status !== "Exhausted" && !files.isLoading && (
          <div className="text-center pt-8">
            <Button
              onClick={() => files.loadMore(10)}
              variant="outline"
              className="rounded-xl px-8 py-3 border-2 hover:bg-gray-50"
            >
              Load More
            </Button>
          </div>
        )}
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={onDelete.isOpen} onOpenChange={onDelete.closeConfirmDialog}>
        <DialogContent className="sm:max-w-[425px] rounded-2xl border-0 shadow-2xl">
          <DialogHeader className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-red-100 text-red-600">
                <DeleteIcon className="w-5 h-5" />
              </div>
              <DialogTitle className="text-xl font-semibold text-gray-900">
                {onDelete.title}
              </DialogTitle>
            </div>
            <DialogDescription className="text-gray-600 text-base leading-relaxed">
              {onDelete.description}
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="flex flex-col sm:flex-row gap-3 pt-6">
            <Button
              variant="outline"
              onClick={onDelete.closeConfirmDialog}
              disabled={onDelete.isLoading}
              className="rounded-xl border-2 hover:bg-gray-50 transition-colors"
            >
              {onDelete.cancelText}
            </Button>
            <Button
              variant="destructive"
              onClick={onDelete.handleConfirm}
              disabled={onDelete.isLoading}
              className="rounded-xl font-medium transition-all duration-200 bg-red-600 hover:bg-red-700 text-white"
            >
              {onDelete.isLoading ? (
                <>
                  <div className="w-4 h-4 mr-2 animate-spin border-2 border-white border-t-transparent rounded-full" />
                  Deleting...
                </>
              ) : (
                onDelete.confirmText
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FileView;
