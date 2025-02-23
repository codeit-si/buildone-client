import Link from "next/link";

interface AuthSwitchProps {
  isLoginPage: boolean;
}

export default function AuthSwitch({ isLoginPage }: AuthSwitchProps) {
  return (
    <p className="flex justify-center gap-x-4 text-sm font-medium">
      {isLoginPage ? "빌던이 처음이신가요?" : "이미 회원이신가요?"}
      <Link
        href={isLoginPage ? "/signup" : "/login"}
        className="text-dark-blue-500 underline"
      >
        {isLoginPage ? "회원가입" : "로그인"}
      </Link>
    </p>
  );
}
