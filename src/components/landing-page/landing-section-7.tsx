"use client";

import Link from "next/link";

import useInView from "@/hooks/use-in-view";
import { cn } from "@/lib/cn";

export default function LandingSection7() {
  const [ref, isInView] = useInView();
  return (
    <section
      ref={ref}
      className="flex items-center justify-center bg-dark-blue-200 py-40 md:py-32 lg:py-120"
    >
      <div className="flex flex-col items-center gap-30 text-center">
        <h2
          className={cn(
            "font-bold text-slate-800 md:text-20 lg:text-40",
            isInView ? "animate-landingFadeInA" : "animate-landingFadeOutA",
          )}
        >
          목표를 정하고,
          <br />
          꾸준히 성장하세요!
        </h2>
        <Link
          href="login"
          className={cn(
            "flex h-52 w-138 items-center justify-center rounded-8 bg-dark-blue-500 text-18 font-bold text-white hover:bg-dark-blue-600 md:h-35 md:w-133 md:text-12 lg:h-52 lg:w-138 lg:text-18",
            isInView ? "animate-landingFadeInB" : "animate-landingFadeOutB",
          )}
        >
          지금 시작하기
        </Link>
      </div>
    </section>
  );
}
