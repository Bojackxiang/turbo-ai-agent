import { google } from "@ai-sdk/google";
import { generateText } from "ai";

import type { StorageActionWriter } from "convex/server";
import { Id } from "../_generated/dataModel";
import { assert } from "../utils/assert";

interface ExtractTextOptions {
  storageId: Id<"_storage">;
  fileName: string;
  mimeType: string;
  bytes: ArrayBuffer;
  type?: "conversation" | "document" | "email" | "general";
  maxLength?: number;
}

interface ExtractedTextResult {
  summary: string;
  keyPoints: string[];
  sentiment?: "positive" | "negative" | "neutral";
  topics: string[];
  originalLength: number;
  extractedLength: number;
  fileName: string;
  mimeType: string;
}

// Helper function to extract text from different file types
async function _extractTextFromFile(
  fileName: string,
  mimeType: string,
  bytes: ArrayBuffer
): Promise<string> {
  const decoder = new TextDecoder();

  // Handle different file types
  if (mimeType.includes("text/") || mimeType.includes("application/json")) {
    return decoder.decode(bytes);
  }

  if (mimeType.includes("application/pdf")) {
    // For PDF files, you might want to use a PDF parser library
    // For now, return a placeholder
    return `[PDF Content - ${fileName}] - PDF parsing not implemented yet`;
  }

  if (
    mimeType.includes("application/msword") ||
    mimeType.includes("application/vnd.openxmlformats")
  ) {
    // For Word documents, you might want to use a document parser
    return `[Document Content - ${fileName}] - Document parsing not implemented yet`;
  }

  // For other types, try to decode as text
  try {
    return decoder.decode(bytes);
  } catch (error) {
    return `[File Content - ${fileName}] - Unable to extract text from ${mimeType}`;
  }
}

export async function extractTextContent(
  ctx: { storage: StorageActionWriter },
  options: ExtractTextOptions
): Promise<ExtractedTextResult> {
  const {
    storageId,
    fileName,
    mimeType,
    bytes,
    type = "document",
    maxLength = 500,
  } = options;
  const storageUrl = await ctx.storage.getUrl(storageId);
  assert(storageUrl, "Storage URL not found for the given storageId.");

  // Extract text content from the file
  const content = await _extractTextFromFile(fileName, mimeType, bytes);

  const prompt = `
    Analyze and extract key information from the following ${type} content from file "${fileName}":

    "${content}"

    Please provide a structured analysis with:
    1. A concise summary (max ${maxLength} characters)
    2. Key points (3-5 bullet points)
    3. Sentiment analysis (positive/negative/neutral)
    4. Main topics discussed (2-4 topics)

    Format your response as valid JSON with the following structure:
    {
      "summary": "...",
      "keyPoints": ["...", "..."],
      "sentiment": "positive|negative|neutral",
      "topics": ["...", "..."]
    }
  `;

  try {
    const result = await generateText({
      model: google("gemini-2.0-flash"),
      prompt: prompt,
      temperature: 0.3,
      maxTokens: 1000,
    });

    // Parse the AI response
    let parsedResult;
    try {
      parsedResult = JSON.parse(result.text);
    } catch (parseError) {
      // Fallback if JSON parsing fails
      parsedResult = {
        summary: result.text.substring(0, maxLength),
        keyPoints: ["Content analysis available"],
        sentiment: "neutral" as const,
        topics: [type],
      };
    }

    // Ensure summary doesn't exceed maxLength
    if (parsedResult.summary && parsedResult.summary.length > maxLength) {
      parsedResult.summary =
        parsedResult.summary.substring(0, maxLength - 3) + "...";
    }

    return {
      summary: parsedResult.summary || "No summary available",
      keyPoints: parsedResult.keyPoints || [],
      sentiment: parsedResult.sentiment || "neutral",
      topics: parsedResult.topics || [type],
      originalLength: content.length,
      extractedLength: parsedResult.summary?.length || 0,
      fileName,
      mimeType,
    };
  } catch (error) {
    console.error("Error extracting text content:", error);

    // Fallback response
    return {
      summary: content.substring(0, Math.min(maxLength, content.length)),
      keyPoints: ["Original content preserved"],
      sentiment: "neutral",
      topics: [type],
      originalLength: content.length,
      extractedLength: Math.min(maxLength, content.length),
      fileName,
      mimeType,
    };
  }
}
