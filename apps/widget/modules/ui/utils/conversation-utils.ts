/**
 * Utility functions for conversation-related operations
 */

// Helper function to format timestamp
export const formatTimeAgo = (timestamp: number): string => {
  const now = Date.now();
  const diff = now - timestamp;

  const minutes = Math.floor(diff / (1000 * 60));
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  return `${days}d ago`;
};

// Helper function to extract text from message content
export const getMessageText = (lastMessage: any): string => {
  if (!lastMessage) return "No messages yet";

  // Handle different message content formats
  if (typeof lastMessage.text === "string") {
    return lastMessage.text;
  }

  if (lastMessage.message?.content) {
    if (typeof lastMessage.message.content === "string") {
      return lastMessage.message.content;
    }

    if (Array.isArray(lastMessage.message.content)) {
      const textContent = lastMessage.message.content.find(
        (item: any) => item.type === "text"
      );
      return textContent?.text || "Message content";
    }
  }

  return "Message content";
};

// Helper function to truncate text
export const truncateText = (text: string, maxLength: number = 80): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + "...";
};
