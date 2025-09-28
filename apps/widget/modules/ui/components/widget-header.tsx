const WidgetHeader = ({
  children,
  className,
}: React.PropsWithChildren & { className?: string }) => {
  return (
    <header className="bg-gradient-to-b bg-blue-500 p-4 text-primary-foreground">
      {children}
    </header>
  );
};

export default WidgetHeader;
