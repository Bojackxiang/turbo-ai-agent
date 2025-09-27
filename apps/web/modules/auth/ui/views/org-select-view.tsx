import React from "react";

import { AuthLayout } from "../components/auth-layout";
import { OrganizationList } from "@clerk/nextjs";

export const OrgSelectView = () => {
  return (
    <div className="mx-auto">
      <OrganizationList
        afterCreateOrganizationUrl={"/"}
        afterSelectOrganizationUrl={"/"}
        hidePersonal
        skipInvitationScreen
      />
    </div>
  );
};
