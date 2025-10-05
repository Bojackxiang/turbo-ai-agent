import { useState, useEffect, useCallback } from "react";

export interface UseLocalStorageOptions {
  /**
   * 序列化函数，默认使用 JSON.stringify
   */
  serializer?: {
    read: (value: string) => any;
    write: (value: any) => string;
  };

  /**
   * 默认值
   */
  defaultValue?: any;

  /**
   * 是否在首次渲染时同步读取localStorage
   * @default true
   */
  syncOnMount?: boolean;
}

export interface UseLocalStorageReturn<T> {
  /**
   * 当前存储的值
   */
  value: T;

  /**
   * 设置新值
   */
  setValue: (value: T | ((prev: T) => T)) => void;

  /**
   * 移除存储的值
   */
  removeValue: () => void;

  /**
   * 是否正在加载中（首次渲染时）
   */
  loading: boolean;

  /**
   * 错误信息
   */
  error: Error | null;
}

/**
 * 本地存储Hook
 *
 * 提供类型安全的localStorage操作，支持序列化和错误处理
 *
 * @param key - localStorage键名
 * @param options - 配置选项
 * @returns Hook的返回值
 *
 * @example
 * ```tsx
 * // 基本用法
 * const { value, setValue, removeValue } = useLocalStorage('user-settings', {
 *   defaultValue: { theme: 'light', language: 'en' }
 * });
 *
 * // 更新值
 * setValue({ theme: 'dark', language: 'zh' });
 *
 * // 函数式更新
 * setValue(prev => ({ ...prev, theme: 'dark' }));
 *
 * // 移除值
 * removeValue();
 * ```
 *
 * @example
 * ```tsx
 * // 自定义序列化
 * const { value, setValue } = useLocalStorage('complex-data', {
 *   defaultValue: new Date(),
 *   serializer: {
 *     read: (value) => new Date(value),
 *     write: (value) => value.toISOString()
 *   }
 * });
 * ```
 */
export function useLocalStorage<T>(
  key: string,
  options: UseLocalStorageOptions = {}
): UseLocalStorageReturn<T> {
  const {
    serializer = {
      read: JSON.parse,
      write: JSON.stringify,
    },
    defaultValue,
    syncOnMount = true,
  } = options;

  const [value, setValue] = useState<T>(() => {
    // 在服务端渲染时返回默认值
    if (typeof window === "undefined") {
      return defaultValue;
    }

    // 如果不同步挂载，返回默认值
    if (!syncOnMount) {
      return defaultValue;
    }

    try {
      const item = window.localStorage.getItem(key);
      return item ? serializer.read(item) : defaultValue;
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return defaultValue;
    }
  });

  const [loading, setLoading] = useState(syncOnMount);
  const [error, setError] = useState<Error | null>(null);

  // 首次渲染时同步读取localStorage（如果启用）
  useEffect(() => {
    if (typeof window === "undefined" || !syncOnMount) {
      setLoading(false);
      return;
    }

    try {
      const item = window.localStorage.getItem(key);
      const parsedValue = item ? serializer.read(item) : defaultValue;
      setValue(parsedValue);
      setError(null);
    } catch (err) {
      const error =
        err instanceof Error
          ? err
          : new Error("Failed to read from localStorage");
      setError(error);
      console.warn(`Error reading localStorage key "${key}":`, error);
    } finally {
      setLoading(false);
    }
  }, [key, syncOnMount, serializer, defaultValue]);

  // 设置值的函数
  const setStoredValue = useCallback(
    (newValue: T | ((prev: T) => T)) => {
      try {
        // 支持函数式更新
        const valueToStore =
          newValue instanceof Function ? newValue(value) : newValue;

        setValue(valueToStore);
        setError(null);

        if (typeof window !== "undefined") {
          if (valueToStore === undefined || valueToStore === null) {
            window.localStorage.removeItem(key);
          } else {
            window.localStorage.setItem(key, serializer.write(valueToStore));
          }
        }
      } catch (err) {
        const error =
          err instanceof Error
            ? err
            : new Error("Failed to write to localStorage");
        setError(error);
        console.warn(`Error setting localStorage key "${key}":`, error);
      }
    },
    [key, serializer, value]
  );

  // 移除值的函数
  const removeValue = useCallback(() => {
    try {
      setValue(defaultValue);
      setError(null);

      if (typeof window !== "undefined") {
        window.localStorage.removeItem(key);
      }
    } catch (err) {
      const error =
        err instanceof Error
          ? err
          : new Error("Failed to remove from localStorage");
      setError(error);
      console.warn(`Error removing localStorage key "${key}":`, error);
    }
  }, [key, defaultValue]);

  return {
    value,
    setValue: setStoredValue,
    removeValue,
    loading,
    error,
  };
}
