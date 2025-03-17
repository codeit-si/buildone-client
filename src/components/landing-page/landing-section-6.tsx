"use client";

import ShowExam8 from "@/assets/landing-page/show_exam_8.svg";
import useInView from "@/hooks/use-in-view";
import { cn } from "@/lib/cn";

export default function LandingSection6() {
  const [ref, isInView] = useInView();
  return (
    <section
      ref={ref}
      className="flex items-center justify-center gap-75 overflow-hidden bg-white"
    >
      <div className="flex flex-col-reverse items-center justify-center gap-24 px-24 py-40 md:flex-row md:gap-116 md:py-58 lg:gap-243 lg:py-150">
        <div
          className={cn(
            "w-full md:w-228 md:p-0 lg:w-588",
            isInView ? "animate-landingFadeIn" : "animate-landingFadeOut",
          )}
        >
          <ShowExam8 />
        </div>
        <div className="flex flex-col gap-4 text-nowrap text-center md:w-[238.47px] md:gap-7 md:text-start lg:w-auto lg:gap-18">
          <span className="font-bold text-dark-blue-500 md:text-16 lg:text-30">
            04
          </span>
          <h2 className="text-20 font-bold text-slate-800 lg:text-40">
            거북목 방지 알림
          </h2>
          <h3 className="text-14 font-medium text-slate-600 lg:text-32">
            일도 중요하지만 건강도 중요하니까,
            <br />
            일정 시간마다 건강한 자세를 유지하세요.
          </h3>
        </div>
      </div>
    </section>
  );
}
