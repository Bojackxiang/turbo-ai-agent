import DashboardLayout from "@/modules/dashboard/layout/dashboard-layout";
import React from "react";

const Layout = ({ children }: React.PropsWithChildren) => {
  return <DashboardLayout>dashboard layout{children}</DashboardLayout>;
};

export default Layout;
