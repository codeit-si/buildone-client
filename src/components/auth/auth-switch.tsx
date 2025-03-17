import Link from "next/link";

interface AuthSwitchProps {
  loginPage?: boolean;
}

export default function AuthSwitch({ loginPage = false }: AuthSwitchProps) {
  return (
    <p className="flex justify-center gap-x-4 text-sm font-medium">
      {loginPage ? "빌던이 처음이신가요?" : "이미 회원이신가요?"}
      <Link
        href={loginPage ? "/signup" : "/login"}
        className="text-dark-blue-500 underline"
      >
        {loginPage ? "회원가입" : "로그인"}
      </Link>
    </p>
  );
}
