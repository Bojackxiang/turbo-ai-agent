"use client";

import { useOrganization } from "@clerk/nextjs";
import { OrgSelectView } from "../views/org-select-view";

/**
 * User need to have an organization to continue
 */
const OrgGuard = ({ children }: React.PropsWithChildren) => {
  const { organization } = useOrganization();
  const orgId = organization?.id;
  console.log("orgId: ", orgId);

  if (!orgId) {
    return (
      <div className="flex items-center justify-center bg-gray-50">
        <OrgSelectView />
      </div>
    );
  }

  return <>{children}</>;
};

export default OrgGuard;
