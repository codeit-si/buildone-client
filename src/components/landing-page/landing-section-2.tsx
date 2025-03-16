"use client";

import ShowExam3 from "@/assets/landing-page/show_exam_3.svg";
import ShowExam9 from "@/assets/landing-page/show_exam_9.svg";
import useInView from "@/hooks/use-in-view";
import { cn } from "@/lib/cn";

export default function LandingSection2() {
  const [ref1, isInView1] = useInView();
  const [ref2, isInView2] = useInView();
  const [ref3, isInView3] = useInView();
  const [ref4, isInView4] = useInView();
  return (
    <section className="flex flex-col items-center justify-end bg-white pt-48 text-center md:h-fit lg:h-816 lg:p-0">
      <h3
        ref={ref1}
        className={cn(
          "mb-8 text-18 font-medium text-slate-600 lg:text-32",
          isInView1 ? "animate-landingFadeInA" : "animate-landingFadeOutA",
        )}
      >
        목표, 학습, 생산성을
        <br />한 곳에서 관리하세요!
      </h3>
      <h2
        ref={ref2}
        className={cn(
          "text-24 font-bold text-slate-800 lg:text-40",
          isInView2 ? "animate-landingFadeInB" : "animate-landingFadeOutB",
        )}
      >
        개발 목표, 학습, 생산성
        <br className="block md:hidden" /> 한번에 관리
      </h2>
      <div
        ref={ref3}
        className={cn(
          "hidden md:block md:w-full md:px-40 lg:h-570 lg:w-1370 lg:p-0",
          isInView3 ? "animate-landingFadeInA" : "animate-landingFadeOutA",
        )}
      >
        <ShowExam3 />
      </div>
      <div
        ref={ref4}
        className={cn(
          "block w-full md:hidden",
          isInView4 ? "animate-landingFadeInA" : "animate-landingFadeOutA",
        )}
      >
        <ShowExam9 />
      </div>
    </section>
  );
}
