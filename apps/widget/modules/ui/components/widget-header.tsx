const WidgetHeader = ({
  children,
  className,
}: React.PropsWithChildren & { className?: string }) => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-primary text-primary-foreground shadow-sm">
      <div className="flex h-16 items-center px-6">
        <h1 className="text-lg font-semibold">{children}</h1>
      </div>
    </header>
  );
};

export default WidgetHeader;
