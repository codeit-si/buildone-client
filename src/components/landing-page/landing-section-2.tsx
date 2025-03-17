"use client";

import ShowExam3 from "@/assets/landing-page/show_exam_3.svg";
import ShowExam3to1 from "@/assets/landing-page/show_exam_3_1.svg";
import ShowExam3to2 from "@/assets/landing-page/show_exam_3_2.svg";
import ShowExam9 from "@/assets/landing-page/show_exam_9.svg";
import useInView from "@/hooks/use-in-view";
import { cn } from "@/lib/cn";

export default function LandingSection2() {
  const [ref3, isInView3] = useInView();
  const [ref4, isInView4] = useInView();
  const [ref5, isInView5] = useInView();
  return (
    <section className="flex flex-col items-center justify-end overflow-hidden bg-white pt-48 text-center md:h-fit lg:h-816 lg:p-0 lg:px-24">
      <h3 className="mb-8 text-18 font-medium text-slate-600 lg:text-32">
        목표, 학습, 생산성을
        <br />한 곳에서 관리하세요!
      </h3>
      <h2 className="text-24 font-bold text-slate-800 lg:text-40">
        개발 목표, 학습, 생산성
        <br className="block md:hidden" /> 한번에 관리
      </h2>
      <div className="relative mt-24 hidden md:block md:h-295 md:w-662 md:px-40 lg:h-570 lg:w-1090 lg:p-0">
        <div className="absolute -left-[50%] bottom-0 w-full translate-x-[50%] drop-shadow-xl">
          <ShowExam3 />
        </div>
        <div
          ref={ref3}
          className={cn(
            "absolute top-20 md:-right-80 md:w-206 lg:-right-120 lg:w-440",
            isInView3 ? "animate-landingFadeIn" : "animate-landingFadeOut",
          )}
        >
          <ShowExam3to1 />
        </div>
        <div
          ref={ref4}
          className={cn(
            "absolute bottom-40 transition-all duration-1000 md:-left-70 md:w-206 lg:-left-110 lg:w-440",
            isInView4
              ? "translate-y-0 opacity-100 delay-500"
              : "translate-y-20 opacity-0",
          )}
        >
          <ShowExam3to2 />
        </div>
      </div>
      <div
        ref={ref5}
        className={cn(
          "block w-full md:hidden",
          isInView5 ? "animate-landingFadeIn" : "animate-landingFadeOut",
        )}
      >
        <ShowExam9 />
      </div>
    </section>
  );
}
