import { SignUp } from "@clerk/nextjs";
import { AuthLayout } from "../../../../modules/auth/ui/components/auth-layout";
import { SignUpView } from "../../../../modules/auth/ui/views/sign-up-view";

export default function Page() {
  return (
    <AuthLayout>
      <SignUpView />
    </AuthLayout>
  );
}
