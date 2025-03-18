"use client";

import Link from "next/link";

import BuilDoneTitle from "@/assets/landing-page/buildone_title.svg";
import ShowExam1 from "@/assets/landing-page/show_exam_1.svg";
import ShowExam2 from "@/assets/landing-page/show_exam_2.svg";
import useInView from "@/hooks/use-in-view";
import { cn } from "@/lib/cn";

export default function LandingSection1() {
  const [ref1, isInView1] = useInView();
  const [ref2, isInView2] = useInView();
  return (
    <section className="flex h-673 items-center justify-center overflow-hidden bg-dark-blue-100 pt-80 text-slate-800 md:h-520 lg:h-816">
      <div className="flex flex-col items-center transition-all duration-200 md:flex-row md:gap-94 lg:gap-154">
        <div className="flex flex-col gap-40">
          <div className="flex flex-col gap-12 text-center md:text-start">
            <h1 className="text-22 font-bold lg:text-36">
              개발자를 위한 목표 &<br className="block md:hidden" /> 학습{" "}
              <br className="hidden md:block" />
              관리 서비스
            </h1>
            <div className="w-184 lg:w-283">
              <BuilDoneTitle />
            </div>
          </div>
          <Link
            href="/login"
            className="hidden items-center justify-center rounded-8 bg-dark-blue-500 text-18 font-bold text-white hover:bg-dark-blue-600 md:flex md:h-35 md:w-113 md:text-12 lg:h-52 lg:w-138 lg:text-18"
          >
            지금 시작하기
          </Link>
        </div>
        <div
          ref={ref1}
          className={cn(
            "my-8 flex w-327 flex-col transition-all duration-1000 md:m-0 md:w-270 lg:w-443",
            isInView1
              ? "translate-y-0 opacity-100"
              : "translate-y-20 opacity-0",
          )}
        >
          <ShowExam1 />
          <ShowExam2 />
        </div>
        <Link
          ref={ref2}
          href="/login"
          className={cn(
            "flex h-52 w-138 items-center justify-center rounded-8 bg-dark-blue-500 text-18 font-bold text-white transition-all duration-1000 hover:bg-dark-blue-600 md:hidden md:h-35 md:w-113 md:text-12 lg:h-52 lg:w-138 lg:text-18",
            isInView2
              ? "translate-y-0 opacity-100"
              : "translate-y-20 opacity-0",
          )}
        >
          지금 시작하기
        </Link>
      </div>
    </section>
  );
}
