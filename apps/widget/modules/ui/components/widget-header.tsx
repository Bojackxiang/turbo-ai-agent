const WidgetHeader = ({
  children,
  className,
}: React.PropsWithChildren & { className?: string }) => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-blue-300 bg-blue-600 text-white shadow-sm">
      <div className="flex h-16 items-center px-6 w-full">
        {/* 如果 children 是字符串，用 h1 包装；否则直接渲染 */}
        {typeof children === "string" ? (
          <h1 className="text-lg font-semibold">{children}</h1>
        ) : (
          children
        )}
      </div>
    </header>
  );
};

export default WidgetHeader;
