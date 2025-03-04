import BuilDoneLogo from "@/assets/logo/main_logo_small.svg";
export default function LandingHeader() {
  return (
    <header className="fixed h-80 w-full border-b bg-white">
      <div className="flex mx-auto max-w-1200 items-center h-full justify-between">
        <BuilDoneLogo />
        <button className="rounded-8 border border-dark-blue-500 px-12 py-10 transition-colors delay-75 text-16 font-bold text-dark-blue-500 hover:bg-dark-blue-500 hover:text-white">
          로그인/회원가입
        </button>
      </div>
    </header>
  );
}
