import { AuthLayout } from "../../../../modules/auth/ui/components/auth-layout";
import { SignInView } from "../../../../modules/auth/ui/views/sign-in-view";

export default function Page() {
  return (
    <AuthLayout>
      <SignInView />
    </AuthLayout>
  );
}
