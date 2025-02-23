import AuthSwitch from "@/components/auth/auth-switch";
import SignUpForm from "@/components/auth/signup-form";

export const metadata = {
  title: "BuilDone - 회원가입",
  description: "계정을 만들고 Buildone을 시작하세요",
};

export default function SignUpPage() {
  return (
    <div className="mt-57 space-y-40">
      <SignUpForm />
      <AuthSwitch isLoginPage={false} />
    </div>
  );
}
