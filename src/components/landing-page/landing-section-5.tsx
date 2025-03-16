"use client";

import ShowExam7 from "@/assets/landing-page/show_exam_7.svg";
import useInView from "@/hooks/use-in-view";
import { cn } from "@/lib/cn";

export default function LandingSection5() {
  const [ref, isInView] = useInView();
  return (
    <section
      ref={ref}
      className="flex items-center justify-center gap-75 bg-dark-blue-100"
    >
      <div className="flex flex-col items-center justify-center gap-24 px-24 py-40 md:flex-row md:gap-116 md:py-58 lg:gap-243 lg:py-150">
        <div
          className={cn(
            "flex flex-col gap-4 text-center md:w-[238.47px] md:gap-7 md:text-start lg:w-auto lg:gap-18",
            isInView ? "animate-landingFadeInA" : "animate-landingFadeOutA",
          )}
        >
          <span className="font-bold text-dark-blue-500 md:text-16 lg:text-30">
            03
          </span>
          <h2 className="text-20 font-bold text-slate-800 lg:text-40">
            GitHub 스타일 스트릭 &<br className="block lg:hidden" /> 뱃지 시스템
          </h2>
          <h3 className="text-14 font-medium text-slate-600 lg:text-32">
            꾸준함이 성과로! 개발자로서의 성장을
            <br />
            시각적으로 확인하세요.
          </h3>
        </div>
        <div
          className={cn(
            "w-full md:w-228 md:p-0 lg:w-588",
            isInView ? "animate-landingFadeInA" : "animate-landingFadeOutA",
          )}
        >
          <ShowExam7 />
        </div>
      </div>
    </section>
  );
}
