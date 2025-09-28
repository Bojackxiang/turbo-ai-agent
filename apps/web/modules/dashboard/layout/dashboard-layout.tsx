import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import OrgGuard from "@/modules/auth/ui/components/org-guard";
import { cookies } from "next/headers";
import React from "react";
import { AppSidebar } from "../ui/AppSidebar";

const DashboardLayout = async ({ children }: React.PropsWithChildren) => {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true";

  return (
    <>
      <OrgGuard>
        <SidebarProvider defaultOpen={defaultOpen}>
          <AppSidebar />
          <main className="flex flex-1 flex-col">{children}</main>
        </SidebarProvider>
      </OrgGuard>
    </>
  );
};

export default DashboardLayout;
