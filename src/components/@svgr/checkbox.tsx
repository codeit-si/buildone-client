import React from "react";

interface CheckboxIconProps {
  size?: number;
}

export default function CheckboxIcon({ size = 24 }: CheckboxIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="flex items-center justify-center"
    >
      <rect x="3" y="3" width="17" height="17" rx="5.5" fill="#6F63FF" />
      <path
        d="M7 11.625L10.1098 14.7348C10.2563 14.8813 10.4937 14.8813 10.6402 14.7348L16.375 9"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
