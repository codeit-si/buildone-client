import Link from "next/link";

import BuilDoneLogo from "@/assets/logo/main_logo_small.svg";

export default function LandingHeader() {
  return (
    <header className="fixed h-80 w-full border-b bg-white">
      <div className="mx-auto flex h-full max-w-1200 items-center justify-between">
        <BuilDoneLogo />
        <Link
          href="/login"
          className="flex items-center justify-center rounded-8 border border-dark-blue-500 px-12 py-10 text-16 font-bold text-dark-blue-500 transition-colors delay-75 hover:bg-dark-blue-500 hover:text-white"
        >
          로그인/회원가입
        </Link>
      </div>
    </header>
  );
}
