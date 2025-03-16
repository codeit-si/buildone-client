"use client";

import ShowExam6 from "@/assets/landing-page/show_exam_6.svg";
import useInView from "@/hooks/use-in-view";
import { cn } from "@/lib/cn";

export default function LandingSection4() {
  const [ref, isInView] = useInView();
  return (
    <section ref={ref} className="flex items-center justify-center bg-white">
      <div className="flex flex-col-reverse items-center justify-center gap-24 px-24 py-40 md:flex-row md:gap-116 md:py-58 lg:gap-243 lg:py-150">
        <div
          className={cn(
            "w-full md:w-228 md:p-0 lg:w-588",
            isInView ? "animate-landingFadeInB" : "animate-landingFadeOutB",
          )}
        >
          <ShowExam6 />
        </div>
        <div
          className={cn(
            "flex flex-col gap-4 text-center md:w-[238.47px] md:gap-7 md:text-start lg:w-auto lg:gap-18",
            isInView ? "animate-landingFadeInB" : "animate-landingFadeOutB",
          )}
        >
          <span className="font-bold text-dark-blue-500 md:text-16 lg:text-30">
            02
          </span>
          <h2 className="text-20 font-bold text-slate-800 lg:text-40">
            노트 기능 &
            <br className="hidden md:block" /> 목표별 모아보기
          </h2>
          <h3 className="text-14 font-medium text-slate-600 lg:text-32">
            목표와 관련된 학습 노트를 손쉽게
            <br />
            정리하고 관리하세요.
          </h3>
        </div>
      </div>
    </section>
  );
}
