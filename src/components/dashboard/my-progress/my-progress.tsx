"use client";

import { useEffect } from "react";

import { useSuspenseQuery } from "@tanstack/react-query";
import { useSpring, motion } from "motion/react";

import { getDashboardProgressOptions } from "@/services/dashboard/query";

const radius = 35;
const circumference = 2 * Math.PI * radius;

export default function MyProgress() {
  const { data } = useSuspenseQuery(getDashboardProgressOptions());

  const progress = useSpring(283, { damping: 15 });

  useEffect(() => {
    if (data.progress !== undefined) {
      progress.set(circumference - (data.progress / 100) * circumference);
    }
  }, [data.progress, progress]);

  return (
    <svg width="166" height="166" viewBox="0 0 100 100">
      <circle
        cx="50"
        cy="50"
        r={radius}
        stroke="white"
        strokeWidth="15"
        fill="transparent"
      />
      <motion.circle
        cx="50"
        cy="50"
        r={radius}
        stroke="black"
        strokeWidth="15"
        fill="transparent"
        strokeDasharray={circumference}
        style={{
          strokeDashoffset: progress,
          transformOrigin: "50% 50%",
        }}
      />
    </svg>
  );
}
