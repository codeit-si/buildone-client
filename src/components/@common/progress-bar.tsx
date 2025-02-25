"use client";

import { useState } from "react";

import { motion } from "motion/react";

import { cn } from "@/lib/cn";

interface ProgressBarProps {
  current: number;
  total: number;
  border?: boolean;
}

export default function ProgressBar({
  current,
  total,
  border = true,
}: ProgressBarProps) {
  const progressPercentage = Math.floor((current / total) * 100);
  const [displayedProgressPercentage, setDisplayedProgressPercentage] =
    useState(0);

  return (
    <div
      className={cn(
        "flex h-20 w-full items-center gap-x-8 rounded-13 bg-white",
        border && "px-9 py-2",
      )}
      role="progressbar"
      aria-valuenow={progressPercentage}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div className="relative h-4 w-full rounded-6 bg-slate-100">
        <motion.div
          className="absolute left-0 h-4 rounded-6 bg-slate-900"
          initial={{ width: 0 }}
          animate={{ width: `${progressPercentage}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          onAnimationComplete={() =>
            setDisplayedProgressPercentage(progressPercentage)
          } // 애니메이션 끝난 후 업데이트
        />
      </div>
      <p className="text-xs font-semibold">{displayedProgressPercentage}%</p>
    </div>
  );
}
