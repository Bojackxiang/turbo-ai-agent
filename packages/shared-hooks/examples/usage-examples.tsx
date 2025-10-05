/**
 * 团队学习示例：如何使用 @repo/shared-hooks
 *
 * 这个文件展示了如何在实际项目中使用共享的React Hooks
 *
 * 注意：当前的 useInfiniteScroll 是简化版本，完整版本请参考README中的完整实现
 */

import React, { useState } from "react";
import { useLocalStorage } from "@repo/shared-hooks";

// 注意：这里暂时注释掉useInfiniteScroll的使用，因为当前版本只返回 { data: "hello world" }
// import { useInfiniteScroll } from "@repo/shared-hooks";

// ============================================================================
// 示例1：使用 useLocalStorage Hook
// ============================================================================

interface UserSettings {
  theme: "light" | "dark";
  language: "en" | "zh";
  autoSave: boolean;
}

export function SettingsExample() {
  // 使用 useLocalStorage 管理用户设置
  const {
    value: settings,
    setValue: setSettings,
    loading,
    error,
  } = useLocalStorage<UserSettings>("user-settings", {
    defaultValue: {
      theme: "light",
      language: "en",
      autoSave: true,
    },
  });

  if (loading) {
    return <div>Loading settings...</div>;
  }

  if (error) {
    return <div>Error loading settings: {error.message}</div>;
  }

  return (
    <div className="p-4 border rounded-lg">
      <h3 className="text-lg font-semibold mb-4">User Settings</h3>

      <div className="space-y-3">
        <div>
          <label className="block text-sm font-medium mb-1">Theme:</label>
          <select
            value={settings.theme}
            onChange={(e) =>
              setSettings((prev) => ({
                ...prev,
                theme: e.target.value as "light" | "dark",
              }))
            }
            className="border rounded px-2 py-1"
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Language:</label>
          <select
            value={settings.language}
            onChange={(e) =>
              setSettings((prev) => ({
                ...prev,
                language: e.target.value as "en" | "zh",
              }))
            }
            className="border rounded px-2 py-1"
          >
            <option value="en">English</option>
            <option value="zh">中文</option>
          </select>
        </div>

        <div>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={settings.autoSave}
              onChange={(e) =>
                setSettings((prev) => ({
                  ...prev,
                  autoSave: e.target.checked,
                }))
              }
              className="mr-2"
            />
            Auto Save
          </label>
        </div>
      </div>

      <div className="mt-4 text-sm text-gray-600">
        Settings are automatically saved to localStorage
      </div>
    </div>
  );
}

// ============================================================================
// 示例2：模拟 useInfiniteScroll Hook 的使用方式
// ============================================================================

/**
 * 这是一个演示性的组件，展示了如何使用 useInfiniteScroll
 * 当前的 useInfiniteScroll 只返回 { data: "hello world" }
 * 完整版本请参考 README 文档中的详细实现
 */

interface Message {
  id: number;
  content: string;
  timestamp: Date;
}

export function InfiniteScrollExample() {
  const [messages, setMessages] = useState<Message[]>([]);

  // 当前简化版本的使用
  // const { data } = useInfiniteScroll();

  // 以下是完整版本的预期用法（演示代码）
  /*
  const { scrollRef, triggerRef } = useInfiniteScroll(
    loadMoreMessages,
    {
      threshold: 100,
      isLoading: false,
      hasMore: true,
    }
  );
  */

  return (
    <div className="h-96 border rounded-lg">
      <div className="p-4 border-b">
        <h3 className="text-lg font-semibold">Messages Example</h3>
        <p className="text-sm text-gray-600">
          这是 useInfiniteScroll 的使用示例。查看 README 了解完整实现。
        </p>
      </div>

      <div className="h-80 overflow-auto p-4">
        <div className="text-center text-gray-500 py-8">
          完整的无限滚动功能请参考 README 文档中的详细实现
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// 示例3：useLocalStorage 的高级用法
// ============================================================================

export function CombinedExample() {
  // 使用 localStorage 保存用户偏好
  const { value: userPrefs, setValue: setUserPrefs } = useLocalStorage<{
    favoriteColor: string;
    notifications: boolean;
  }>("user-preferences", {
    defaultValue: {
      favoriteColor: "blue",
      notifications: true,
    },
  });

  return (
    <div className="border rounded-lg">
      <div className="p-4 border-b">
        <h3 className="text-lg font-semibold">
          Advanced useLocalStorage Example
        </h3>
      </div>

      <div className="p-4 space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">
            Favorite Color:
          </label>
          <div className="flex gap-2">
            {["blue", "green", "red", "purple"].map((color) => (
              <button
                key={color}
                onClick={() =>
                  setUserPrefs((prev) => ({ ...prev, favoriteColor: color }))
                }
                className={`px-3 py-1 rounded capitalize ${
                  userPrefs.favoriteColor === color
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                {color}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={userPrefs.notifications}
              onChange={(e) =>
                setUserPrefs((prev) => ({
                  ...prev,
                  notifications: e.target.checked,
                }))
              }
              className="mr-2"
            />
            Enable Notifications
          </label>
        </div>

        <div className="mt-4 p-3 bg-gray-50 rounded text-sm">
          <strong>Current Preferences:</strong>
          <pre className="mt-1">{JSON.stringify(userPrefs, null, 2)}</pre>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// 主演示组件
// ============================================================================

export function SharedHooksDemo() {
  const [activeTab, setActiveTab] = useState<
    "settings" | "infinite" | "combined"
  >("settings");

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">@repo/shared-hooks 使用示例</h1>
        <p className="text-gray-600">
          以下示例展示了如何在项目中使用共享的React Hooks
        </p>
      </div>

      {/* 标签切换 */}
      <div className="mb-6">
        <div className="flex border-b">
          {[
            { key: "settings", label: "useLocalStorage 示例" },
            { key: "infinite", label: "useInfiniteScroll 示例" },
            { key: "combined", label: "组合使用示例" },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`px-4 py-2 font-medium ${
                activeTab === tab.key
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* 示例内容 */}
      <div className="space-y-6">
        {activeTab === "settings" && <SettingsExample />}
        {activeTab === "infinite" && <InfiniteScrollExample />}
        {activeTab === "combined" && <CombinedExample />}
      </div>

      {/* 代码说明 */}
      <div className="mt-8 p-4 bg-blue-50 rounded-lg">
        <h4 className="font-semibold mb-2">💡 学习要点：</h4>
        <ul className="text-sm space-y-1 text-blue-800">
          <li>• 所有hooks都提供完整的TypeScript类型支持</li>
          <li>
            • 使用统一的导入方式：
            <code>import &#123; hookName &#125; from "@repo/shared-hooks"</code>
          </li>
          <li>• hooks设计遵循React最佳实践，支持SSR和错误处理</li>
          <li>• 可以轻松组合多个hooks实现复杂功能</li>
          <li>• 查看源码获取更多配置选项和高级用法</li>
        </ul>
      </div>
    </div>
  );
}
