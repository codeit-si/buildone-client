"use client";

import Link from "next/link";

import BuilDoneTitle from "@/assets/landing-page/buildone_title.svg";
import ShowExam1 from "@/assets/landing-page/show_exam_1.svg";
import ShowExam2 from "@/assets/landing-page/show_exam_2.svg";
import useInView from "@/hooks/use-in-view";
import { cn } from "@/lib/cn";

export default function LandingSection1() {
  const [ref, isInView] = useInView();
  return (
    <section
      ref={ref}
      className="flex h-673 items-center justify-center overflow-hidden bg-dark-blue-100 pt-80 text-slate-800 md:h-520 lg:h-816"
    >
      <div className="flex flex-col items-center transition-all duration-200 md:flex-row md:gap-94 lg:gap-154">
        <div
          className={cn(
            "flex flex-col gap-40",
            isInView ? "animate-landingFadeIn" : "animate-landingFadeOut",
          )}
        >
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
          className={cn(
            "my-8 flex w-327 flex-col md:m-0 md:w-270 lg:w-443",
            isInView ? "animate-landingFadeIn" : "animate-landingFadeOut",
          )}
        >
          <ShowExam1 />
          <ShowExam2 />
        </div>
        <Link
          href="/login"
          className={cn(
            "flex h-52 w-138 items-center justify-center rounded-8 bg-dark-blue-500 text-18 font-bold text-white hover:bg-dark-blue-600 md:hidden md:h-35 md:w-113 md:text-12 lg:h-52 lg:w-138 lg:text-18",
            isInView ? "animate-landingFadeIn" : "animate-landingFadeOut",
          )}
        >
          지금 시작하기
        </Link>
      </div>
    </section>
  );
}
