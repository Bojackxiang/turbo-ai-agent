/**
 * Logger utility with formatted output
 * Format: timestamp | level | filename | message
 */

export type LogLevel = "info" | "debug" | "error" | "warn";

interface LoggerConfig {
  enableTimestamp?: boolean;
  enableFilename?: boolean;
  dateFormat?: "iso" | "locale" | "short";
}

class Logger {
  private config: LoggerConfig;

  constructor(config: LoggerConfig = {}) {
    this.config = {
      enableTimestamp: true,
      enableFilename: true,
      dateFormat: "iso",
      ...config,
    };
  }

  private formatTimestamp(): string {
    if (!this.config.enableTimestamp) return "";

    const now = new Date();

    switch (this.config.dateFormat) {
      case "locale":
        return now.toLocaleString();
      case "short":
        return now.toISOString().slice(0, 19).replace("T", " ");
      case "iso":
      default:
        return now.toISOString();
    }
  }

  private getCallerInfo(): string {
    if (!this.config.enableFilename) return "";

    try {
      const stack = new Error().stack;
      if (!stack) return "unknown";

      // Get the third line of stack trace (skip Error, this function, and log method)
      const stackLines = stack.split("\n");
      const callerLine = stackLines[4] || stackLines[3] || "";

      // Extract filename from stack trace
      const match = callerLine.match(/\/([^\/]+\.ts):/);
      if (match && match[1]) {
        return match[1];
      }

      // Fallback: try to extract any filename pattern
      const fileMatch = callerLine.match(/([^\/\s]+\.(ts|js)):/);
      return fileMatch && fileMatch[1] ? fileMatch[1] : "unknown";
    } catch (error) {
      return "unknown";
    }
  }

  private formatMessage(
    level: LogLevel,
    message: string,
    ...args: any[]
  ): string {
    const timestamp = this.formatTimestamp();
    const filename = this.getCallerInfo();
    const formattedArgs = args.length > 0 ? ` ${JSON.stringify(args)}` : "";

    const parts = [
      timestamp,
      level.toUpperCase(),
      filename,
      message + formattedArgs,
    ].filter(Boolean);

    return parts.join(" | ");
  }

  private getConsoleMethod(level: LogLevel): (...args: any[]) => void {
    switch (level) {
      case "error":
        return console.error;
      case "warn":
        return console.warn;
      case "debug":
        return console.debug;
      case "info":
      default:
        return console.log;
    }
  }

  public info(message: string, ...args: any[]): void {
    const formatted = this.formatMessage("info", message, ...args);
    this.getConsoleMethod("info")(formatted);
  }

  public debug(message: string, ...args: any[]): void {
    const formatted = this.formatMessage("debug", message, ...args);
    this.getConsoleMethod("debug")(formatted);
  }

  public error(message: string, ...args: any[]): void {
    const formatted = this.formatMessage("error", message, ...args);
    this.getConsoleMethod("error")(formatted);
  }

  public warn(message: string, ...args: any[]): void {
    const formatted = this.formatMessage("warn", message, ...args);
    this.getConsoleMethod("warn")(formatted);
  }

  // Utility method for logging with custom level
  public log(level: LogLevel, message: string, ...args: any[]): void {
    switch (level) {
      case "info":
        this.info(message, ...args);
        break;
      case "debug":
        this.debug(message, ...args);
        break;
      case "error":
        this.error(message, ...args);
        break;
      case "warn":
        this.warn(message, ...args);
        break;
    }
  }
}

// Default logger instance
export const logger = new Logger();

// Factory function to create custom logger
export const createLogger = (config?: LoggerConfig): Logger => {
  return new Logger(config);
};

// Convenience functions for direct use
export const info = (message: string, ...args: any[]) =>
  logger.info(message, ...args);
export const debug = (message: string, ...args: any[]) =>
  logger.debug(message, ...args);
export const error = (message: string, ...args: any[]) =>
  logger.error(message, ...args);
export const warn = (message: string, ...args: any[]) =>
  logger.warn(message, ...args);

// Export types
export { Logger };

/**
 * Usage Examples:
 *
 * // Using default logger
 * import { logger, info, debug, error, warn } from './logger';
 *
 * logger.info('User login successful', { userId: 123 });
 * info('This is an info message');
 * debug('Debug information', { data: 'some data' });
 * error('Something went wrong', new Error('Details'));
 * warn('Warning message');
 *
 * // Using custom logger
 * import { createLogger } from './logger';
 *
 * const customLogger = createLogger({
 *   dateFormat: 'short',
 *   enableFilename: false
 * });
 *
 * customLogger.info('Custom logger message');
 *
 * // Expected output format:
 * // 2025-10-21T10:30:45.123Z | INFO | logger.ts | User login successful | [{"userId":123}]
 * // 2025-10-21T10:30:45.124Z | DEBUG | app.ts | Debug information | [{"data":"some data"}]
 * // 2025-10-21T10:30:45.125Z | ERROR | handler.ts | Something went wrong | [{}]
 */
