"use client";

import React, { useState, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Upload, File, X, CheckCircle, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAction } from "convex/react";
import { api } from "@repo/backend/convex/_generated/api";

// Simple Label component as fallback
const Label: React.FC<React.LabelHTMLAttributes<HTMLLabelElement>> = ({
  className,
  children,
  ...props
}) => (
  <label
    className={cn(
      "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
      className
    )}
    {...props}
  >
    {children}
  </label>
);

// File categories
const FILE_CATEGORIES = [
  { value: "document", label: "Document" },
  { value: "image", label: "Image" },
  { value: "video", label: "Video" },
  { value: "audio", label: "Audio" },
  { value: "other", label: "Other" },
] as const;

interface FileUpload {
  file: File;
  category: string;
  filename: string;
}

interface UploadDialogProps {
  maxFileSize?: number; // in MB
  acceptedFileTypes?: string[];
  triggerClassName?: string;
  triggerText?: string;
}

const UploadDialog: React.FC<UploadDialogProps> = ({
  maxFileSize = 10, // Default 10MB
  acceptedFileTypes = ["*/*"], // Accept all files by default
  triggerClassName,
  triggerText = "Upload File",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [category, setCategory] = useState<string>("");
  const [filename, setFilename] = useState<string>("");
  const [isDragOver, setIsDragOver] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const fileInputRef = useRef<HTMLInputElement>(null);

  const addFile = useAction(api.private.file.addFile);

  // File validation
  const validateFile = useCallback(
    (file: File): string | null => {
      // Check file size
      if (file.size > maxFileSize * 1024 * 1024) {
        return `File size exceeds ${maxFileSize}MB limit`;
      }

      // Check file type if specified
      if (acceptedFileTypes.length > 0 && !acceptedFileTypes.includes("*/*")) {
        const isAccepted = acceptedFileTypes.some((type) => {
          if (type.endsWith("*")) {
            return file.type.startsWith(type.slice(0, -1));
          }
          return file.type === type;
        });

        if (!isAccepted) {
          return `File type not supported. Accepted types: ${acceptedFileTypes.join(", ")}`;
        }
      }

      return null;
    },
    [maxFileSize, acceptedFileTypes]
  );

  // Handle file selection
  const handleFileSelect = useCallback(
    (file: File) => {
      const error = validateFile(file);
      if (error) {
        setErrorMessage(error);
        setUploadStatus("error");
        return;
      }

      setSelectedFile(file);
      setFilename(file.name);
      setUploadStatus("idle");
      setErrorMessage("");

      // Auto-detect category based on file type
      if (file.type.startsWith("image/")) {
        setCategory("image");
      } else if (file.type.startsWith("video/")) {
        setCategory("video");
      } else if (file.type.startsWith("audio/")) {
        setCategory("audio");
      } else if (
        file.type.includes("pdf") ||
        file.type.includes("document") ||
        file.type.includes("text")
      ) {
        setCategory("document");
      } else {
        setCategory("other");
      }
    },
    [validateFile]
  );

  // Handle drag and drop
  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragOver(false);

      const files = Array.from(e.dataTransfer.files);
      if (files.length > 0 && files[0]) {
        handleFileSelect(files[0]); // Only take the first file
      }
    },
    [handleFileSelect]
  );

  // Handle click to select file
  const handleFileInputClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0 && files[0]) {
      handleFileSelect(files[0]);
    }
  };

  // Handle successful upload and close dialog
  const handleUpload = async () => {
    if (!selectedFile || !category || !filename.trim()) {
      setErrorMessage("Please select a file and fill in all required fields");
      setUploadStatus("error");
      return;
    }

    setIsUploading(true);
    setUploadStatus("idle");

    try {
      // TEST: Upload file here.
      await addFile({
        bytes: await selectedFile.arrayBuffer(),
        fileName: filename,
        mimeType: selectedFile.type,
        category,
      });

      setUploadStatus("success");
      // Reset form and close dialog after successful upload
      setTimeout(() => {
        setSelectedFile(null);
        setCategory("");
        setFilename("");
        setUploadStatus("idle");
        setIsOpen(false);
      }, 1500);
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Upload failed");
      setUploadStatus("error");
    } finally {
      setIsUploading(false);
    }
  };

  // Clear selection
  const handleClear = () => {
    setSelectedFile(null);
    setCategory("");
    setFilename("");
    setUploadStatus("idle");
    setErrorMessage("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Reset form when dialog closes
  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      handleClear();
    }
  };

  // Format file size
  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button className={triggerClassName}>
          <Upload className="w-4 h-4 mr-2" />
          {triggerText}
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Upload className="w-5 h-5" />
            Upload File
          </DialogTitle>
          <DialogDescription>
            Select a file to upload. Maximum size: {maxFileSize}MB
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Drop Zone */}
          <div
            className={cn(
              "relative border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors",
              isDragOver
                ? "border-blue-500 bg-blue-50"
                : selectedFile
                  ? "border-green-500 bg-green-50"
                  : "border-gray-300 hover:border-gray-400"
            )}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={handleFileInputClick}
          >
            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              onChange={handleFileInputChange}
              accept={acceptedFileTypes.join(",")}
            />

            {selectedFile ? (
              <div className="space-y-2">
                <File className="w-8 h-8 mx-auto text-green-600" />
                <div className="text-sm font-medium text-green-700">
                  {selectedFile.name}
                </div>
                <div className="text-xs text-gray-500">
                  {formatFileSize(selectedFile.size)}
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <Upload className="w-8 h-8 mx-auto text-gray-400" />
                <div className="text-sm text-gray-600">
                  <span className="font-medium">Click to upload</span> or drag
                  and drop
                </div>
                <div className="text-xs text-gray-400">
                  Max size: {maxFileSize}MB
                </div>
              </div>
            )}
          </div>

          {/* File Details Form */}
          {selectedFile && (
            <div className="space-y-4">
              {/* Category Selection */}
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {FILE_CATEGORIES.map((cat) => (
                      <SelectItem key={cat.value} value={cat.value}>
                        {cat.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Filename Input */}
              <div className="space-y-2">
                <Label htmlFor="filename">Filename</Label>
                <Input
                  id="filename"
                  value={filename}
                  onChange={(e) => setFilename(e.target.value)}
                  placeholder="Enter filename"
                  className="w-full"
                />
              </div>
            </div>
          )}

          {/* Status Messages */}
          {uploadStatus === "success" && (
            <div className="flex items-center gap-2 text-green-600 text-sm">
              <CheckCircle className="w-4 h-4" />
              File uploaded successfully!
            </div>
          )}

          {uploadStatus === "error" && errorMessage && (
            <div className="flex items-center gap-2 text-red-600 text-sm">
              <AlertCircle className="w-4 h-4" />
              {errorMessage}
            </div>
          )}

          {/* Action Buttons */}
          {selectedFile && (
            <div className="flex gap-2">
              <Button
                onClick={handleUpload}
                disabled={isUploading || !category || !filename.trim()}
                className="flex-1"
              >
                {isUploading ? "Uploading..." : "Upload"}
              </Button>
              <Button
                onClick={handleClear}
                variant="outline"
                size="icon"
                disabled={isUploading}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UploadDialog;
