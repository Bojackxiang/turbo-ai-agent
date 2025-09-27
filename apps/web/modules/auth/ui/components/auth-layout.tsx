export const AuthLayout = ({ children }: React.PropsWithChildren) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 px-4">
        <div className="flex flex-col items-center justify-center">
          {children}
        </div>
      </div>
    </div>
  );
};
