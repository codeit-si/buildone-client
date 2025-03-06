"use client";

import { useEffect } from "react";

import { useSuspenseQuery } from "@tanstack/react-query";
import { useSpring, motion, useTransform } from "motion/react";

import EllipseIcon from "@/assets/icons-small/ellipse.svg";
import { getDashboardProgressOptions } from "@/services/dashboard/query";

const radius = 40;
const circumference = 2 * Math.PI * radius;

export default function MyProgress() {
  const { data } = useSuspenseQuery(getDashboardProgressOptions());
  const progress = useSpring(circumference, { bounce: 0 });
  const progressNotRounded = useSpring(0, { bounce: 0 });
  const percentage = useTransform(() => Math.round(progressNotRounded.get()));

  useEffect(() => {
    if (data.progress !== undefined) {
      progress.set(circumference - (data.progress / 100) * circumference);
      progressNotRounded.set(data.progress);
    }
  }, [data.progress, progress, progressNotRounded]);

  return (
    <div className="flex h-full justify-between">
      <div className="flex flex-col text-white">
        <div className="flex h-40 w-40 items-center justify-center rounded-15 bg-[#0F172A]">
          <EllipseIcon />
        </div>
        <span className="mt-16 text-base font-semibold md:text-lg">
          내 진행 상황
        </span>
        <div className="flex items-center gap-4">
          <motion.span className="mt-4 text-[30px] font-bold leading-[36px]">
            {percentage}
          </motion.span>
          <span className="text-base font-semibold">%</span>
        </div>
      </div>
      <div className="z-10 mb-6 mr-16 mt-26 self-end md:mr-8 md:self-start lg:mr-76">
        <svg width="166" height="166" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r={radius}
            stroke="white"
            strokeWidth="20"
            fill="transparent"
          />
          <motion.circle
            cx="50"
            cy="50"
            r={radius}
            stroke="black"
            strokeWidth="20"
            fill="transparent"
            strokeDasharray={circumference}
            style={{
              strokeDashoffset: progress,
              transformOrigin: "50% 50%",
            }}
          />
        </svg>
      </div>
    </div>
  );
}
