# @repo/shared-hooks

这个包包含了可在整个monorepo中共享的React Hooks。本文档将详细介绍如何创建、配置和使用共享的React Hooks。

## 📚 目录

- [快速开始](#快速开始)
- [如何创建新的Shared Hook](#如何创建新的shared-hook)
- [配置指南](#配置指南)
- [在UI组件中使用](#在ui组件中使用)
- [最佳实践](#最佳实践)
- [故障排除](#故障排除)
- [现有Hooks文档](#现有hooks文档)

## 🚀 快速开始

### 在你的应用中使用

1. 在你的应用的 `package.json` 中添加依赖：

```json
{
  "dependencies": {
    "@repo/shared-hooks": "workspace:*"
  }
}
```

2. 安装依赖：

```bash
pnpm install
```

3. 在组件中使用：

```tsx
import { useInfiniteScroll } from "@repo/shared-hooks";

function MyComponent() {
  const { data } = useInfiniteScroll();
  return <div>{data}</div>;
}
```

## 🛠️ 如何创建新的Shared Hook

### 步骤1：创建Hook文件

在 `src/` 目录下创建新的hook文件，例如 `use-my-hook.ts`：

````tsx
// src/use-my-hook.ts
import { useState, useEffect } from "react";

export interface UseMyHookOptions {
  initialValue?: string;
  autoUpdate?: boolean;
}

export interface UseMyHookReturn {
  value: string;
  setValue: (value: string) => void;
  reset: () => void;
}

/**
 * 自定义Hook示例
 *
 * @param options - 配置选项
 * @returns Hook的返回值
 *
 * @example
 * ```tsx
 * const { value, setValue, reset } = useMyHook({
 *   initialValue: "Hello",
 *   autoUpdate: true
 * });
 * ```
 */
export function useMyHook(options: UseMyHookOptions = {}): UseMyHookReturn {
  const { initialValue = "", autoUpdate = false } = options;
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    if (autoUpdate) {
      // 自动更新逻辑
    }
  }, [autoUpdate]);

  const reset = () => {
    setValue(initialValue);
  };

  return {
    value,
    setValue,
    reset,
  };
}
````

### 步骤2：在index.ts中导出

在 `src/index.ts` 中添加新hook的导出：

```tsx
// src/index.ts
export * from "./use-infinite-scroll.js";
export * from "./use-my-hook.js"; // 添加新的hook
```

### 步骤3：更新package.json的导出配置

如果你想支持子路径导入，在 `package.json` 中添加：

```json
{
  "exports": {
    ".": {
      "types": "./src/index.ts",
      "default": "./dist/index.js"
    },
    "./use-infinite-scroll": {
      "types": "./src/use-infinite-scroll.ts",
      "default": "./dist/use-infinite-scroll.js"
    },
    "./use-my-hook": {
      "types": "./src/use-my-hook.ts",
      "default": "./dist/use-my-hook.js"
    }
  }
}
```

### 步骤4：构建和测试

```bash
# 构建shared-hooks包
cd packages/shared-hooks
pnpm build

# 在根目录重新安装依赖
cd ../..
pnpm install
```

## ⚙️ 配置指南

### 包结构

```
packages/shared-hooks/
├── src/
│   ├── index.ts              # 主导出文件
│   ├── use-infinite-scroll.ts # 现有hook
│   └── use-my-hook.ts        # 新的hook
├── dist/                     # 构建输出目录
├── package.json              # 包配置
├── tsconfig.json            # TypeScript配置
└── README.md                # 文档
```

### package.json 完整配置

```json
{
  "name": "@repo/shared-hooks",
  "type": "module",
  "scripts": {
    "dev": "tsc --watch",
    "build": "tsc"
  },
  "exports": {
    ".": {
      "types": "./src/index.ts",
      "default": "./dist/index.js"
    },
    "./use-infinite-scroll": {
      "types": "./src/use-infinite-scroll.ts",
      "default": "./dist/use-infinite-scroll.js"
    }
  },
  "peerDependencies": {
    "react": "^18.0.0 || ^19.0.0"
  },
  "devDependencies": {
    "@repo/typescript-config": "workspace:*",
    "@types/react": "^18.0.0",
    "typescript": "latest"
  }
}
```

### tsconfig.json 配置

```json
{
  "extends": "@repo/typescript-config/react-library.json",
  "compilerOptions": {
    "outDir": "./dist",
    "declaration": true,
    "declarationMap": true,
    "jsx": "react-jsx"
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

## 🎯 在UI组件中使用

### 方式1：从主包导入（推荐）

```tsx
import { useMyHook, useInfiniteScroll } from "@repo/shared-hooks";

function MyComponent() {
  const { value, setValue } = useMyHook({ initialValue: "Hello" });
  const { data } = useInfiniteScroll();

  return (
    <div>
      <p>{value}</p>
      <p>{data}</p>
    </div>
  );
}
```

### 方式2：子路径导入

```tsx
import { useMyHook } from "@repo/shared-hooks/use-my-hook";
import { useInfiniteScroll } from "@repo/shared-hooks/use-infinite-scroll";
```

### 在不同应用中使用

#### Widget应用

```tsx
// apps/widget/modules/ui/components/my-component.tsx
import { useMyHook } from "@repo/shared-hooks";

export function MyWidgetComponent() {
  const { value, setValue, reset } = useMyHook({
    initialValue: "Widget",
    autoUpdate: true,
  });

  return (
    <div className="widget-component">
      <input value={value} onChange={(e) => setValue(e.target.value)} />
      <button onClick={reset}>Reset</button>
    </div>
  );
}
```

#### Web应用

```tsx
// apps/web/components/my-component.tsx
import { useMyHook } from "@repo/shared-hooks";

export function MyWebComponent() {
  const { value, setValue } = useMyHook({
    initialValue: "Web App",
  });

  return (
    <div className="web-component">
      <h1>{value}</h1>
      <button onClick={() => setValue("Updated!")}>Update</button>
    </div>
  );
}
```

## 📝 最佳实践

### 1. Hook命名规范

- 始终以 `use` 开头
- 使用kebab-case文件名：`use-my-hook.ts`
- 使用camelCase函数名：`useMyHook`

### 2. TypeScript类型定义

- 为选项和返回值定义清晰的接口
- 使用泛型支持灵活的类型

```tsx
export interface UseDataHookOptions<T> {
  initialData?: T;
  fetchOnMount?: boolean;
}

export interface UseDataHookReturn<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
  refetch: () => void;
}

export function useDataHook<T>(
  options: UseDataHookOptions<T>
): UseDataHookReturn<T> {
  // 实现
}
```

### 3. 文档和示例

- 使用JSDoc注释
- 提供使用示例
- 说明参数和返回值

### 4. 错误处理

```tsx
export function useApiHook() {
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(async () => {
    try {
      // API调用
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Unknown error"));
    }
  }, []);

  return { fetchData, error };
}
```

### 5. 性能优化

- 使用 `useCallback` 和 `useMemo` 优化性能
- 避免在hook内部创建不必要的对象

```tsx
export function useOptimizedHook(deps: string[]) {
  const memoizedValue = useMemo(() => {
    return computeExpensiveValue(deps);
  }, deps);

  const memoizedCallback = useCallback(() => {
    // 回调逻辑
  }, deps);

  return { memoizedValue, memoizedCallback };
}
```

## 🐛 故障排除

### 常见问题

#### 1. 模块解析错误

```
Module not found: Can't resolve '@repo/shared-hooks'
```

**解决方案：**

- 确保在应用的 `package.json` 中添加了依赖
- 运行 `pnpm install` 重新安装依赖
- 检查 `shared-hooks` 包是否正确构建

#### 2. TypeScript错误

```
Cannot find module '@repo/shared-hooks' or its corresponding type declarations
```

**解决方案：**

- 确保 `shared-hooks` 包已构建：`pnpm build`
- 检查 `package.json` 中的 `exports` 配置
- 重启TypeScript服务器

#### 3. 导入路径错误

```
Module not found: Can't resolve '@repo/shared-hooks/use-my-hook'
```

**解决方案：**

- 检查 `package.json` 中是否配置了对应的子路径导出
- 使用主包导入：`import { useMyHook } from "@repo/shared-hooks"`

### 调试步骤

1. **检查包是否正确构建：**

   ```bash
   cd packages/shared-hooks
   pnpm build
   ls dist/  # 应该看到对应的.js和.d.ts文件
   ```

2. **检查导出配置：**

   ```bash
   # 查看生成的index.js文件
   cat dist/index.js
   ```

3. **重新安装依赖：**

   ```bash
   cd ../..
   pnpm install
   ```

4. **清理缓存：**

   ```bash
   # 清理Next.js缓存（如果使用Next.js）
   rm -rf .next

   # 清理TypeScript缓存
   rm -rf node_modules/.cache
   ```

## 📖 现有Hooks文档

### useInfiniteScroll

无限滚动Hook，支持多种使用模式。

```tsx
import { useInfiniteScroll } from "@repo/shared-hooks";

const { data } = useInfiniteScroll();
console.log(data); // "hello world"
```

更多详细用法请查看源码中的注释和示例。

## 🤝 贡献指南

1. 创建新的hook文件
2. 添加完整的TypeScript类型定义
3. 编写JSDoc注释和使用示例
4. 在 `index.ts` 中导出
5. 更新 `package.json` 的导出配置（如需要）
6. 构建和测试
7. 更新本README文档

## 📝 版本更新日志

- v1.0.0: 初始版本，包含 `useInfiniteScroll`
- 更多版本历史请查看git提交记录

---

如有问题或建议，请创建issue或联系团队成员。
