import Link from "next/link";

export default function LandingFooter() {
  return (
    <footer className="flex h-180 flex-col items-center justify-center gap-16 bg-white text-14 text-slate-600 lg:text-16">
      <div className="flex gap-12">
        <div className="flex gap-8">
          <b className="text-slate-800">builDone</b>
          <span>|</span>
          <b className="text-slate-800">사이트 소개</b>
        </div>
        <span>개발자의 성장을 돕는 투두리스트</span>
      </div>
      <div className="flex flex-col items-center gap-12 md:flex-row">
        <div className="flex gap-8">
          <b className="text-slate-800">깃허브 링크</b>
          <a
            className="hover:underline"
            href="mailto:https://github.com/codeit-si/buildone-client"
          >
            https://github.com/codeit-si/buildone-client
          </a>
        </div>
        <div className="flex gap-8">
          <b className="text-slate-800">이메일 문의</b>
          <Link className="hover:underline" href="/">
            info@buildone.co.kr
          </Link>
        </div>
      </div>
      <span>Copyright © builDone All rights reserved.</span>
    </footer>
  );
}
