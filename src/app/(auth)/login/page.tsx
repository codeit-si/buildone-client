import LoginForm from "@/containers/login/login-form";
import RegisterGuide from "@/containers/login/register-guide";

export const metadata = {
  title: "BuilDone - 로그인",
  description:
    "BuilDone에 로그인하여 목표, 학습, 생산성을 한곳에서 관리하세요!",
};

export default function LoginPage() {
  return (
    <div className="mt-57">
      <LoginForm />
      <RegisterGuide />
    </div>
  );
}
