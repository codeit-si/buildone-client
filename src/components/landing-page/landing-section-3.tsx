"use client";

import ShowExam4 from "@/assets/landing-page/show_exam_4.svg";
import ShowExam5 from "@/assets/landing-page/show_exam_5.svg";
import useInView from "@/hooks/use-in-view";
import { cn } from "@/lib/cn";

export default function LandingSection3() {
  const [ref, isInView] = useInView();
  return (
    <section
      ref={ref}
      className="flex h-auto items-center justify-center bg-dark-blue-100 md:py-58 lg:py-150"
    >
      <div className="flex w-full flex-col items-center gap-24 py-40 md:w-auto md:flex-row md:gap-116 md:p-0">
        <div
          className={cn(
            "flex flex-col gap-4 text-center md:gap-7 md:text-start lg:gap-18",
            isInView ? "animate-landingFadeInA" : "animate-landingFadeOutA",
          )}
        >
          <span className="font-bold text-dark-blue-500 md:text-16 lg:text-30">
            01
          </span>
          <h2 className="text-20 font-bold text-slate-800 lg:text-40">
            목표 기반 할 일 &
            <br className="hidden md:block" />
            진행률 관리
          </h2>
          <h3 className="text-14 font-medium text-slate-600 lg:text-32">
            목표를 중심으로 할 일을 계획하고, 진행률을
            <br />
            한눈에 확인하세요.
          </h3>
        </div>
        <div
          className={cn(
            "flex w-full flex-col px-24 md:w-228 md:p-0 lg:w-588",
            isInView ? "animate-landingFadeInA" : "animate-landingFadeOutA",
          )}
        >
          <ShowExam4 />
          <ShowExam5 />
        </div>
      </div>
    </section>
  );
}
