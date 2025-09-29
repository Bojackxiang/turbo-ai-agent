import React, { Suspense } from "react";

const AuthLayout = ({ children }: React.PropsWithChildren) => {
  return <Suspense>{children}</Suspense>;
};

export default AuthLayout;
