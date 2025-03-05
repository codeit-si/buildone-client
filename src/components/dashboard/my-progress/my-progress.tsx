"use client";

import { useEffect } from "react";

import { useSuspenseQuery } from "@tanstack/react-query";
import { useSpring, motion } from "motion/react";

import { getDashboardProgressOptions } from "@/services/dashboard/query";

export default function MyProgress() {
  const { data } = useSuspenseQuery(getDashboardProgressOptions());

  const progress = useSpring(0, { damping: 15 });

  useEffect(() => {
    if (data.progress !== undefined) {
      progress.set(283 - (data.progress / 100) * 283);
    }
  }, [data.progress, progress]);

  return (
    <svg width="200" height="200" viewBox="0 0 100 100">
      <circle
        cx="50"
        cy="50"
        r="35"
        stroke="black"
        strokeWidth="20"
        fill="transparent"
      />
      <motion.circle
        cx="50"
        cy="50"
        r="35"
        stroke="white"
        strokeWidth="20"
        fill="white"
        strokeDasharray="283"
        style={{
          strokeDashoffset: progress.get(),
          transform: "rotate(-90deg)",
          transformOrigin: "50% 50%",
        }}
        transition={{ type: "spring", damping: 15 }}
      />
    </svg>
  );
}
