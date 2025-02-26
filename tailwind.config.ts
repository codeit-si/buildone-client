/* eslint-disable @typescript-eslint/no-var-requires */

import typography from "@tailwindcss/typography";

import type { Config } from "tailwindcss";

const pxToRem = require("tailwindcss-preset-px-to-rem");

export const screens = {
  md: "744px",
  lg: "1200px",
};

const config: Config = {
  presets: [pxToRem],
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily: {
      pretendard: [
        "var(--font-pretendard)",
        "-apple-system",
        "BlinkMacSystemFont",
        "system-ui",
        "Roboto",
        "Helvetica\\ Neue",
        "Segoe\\ UI",
        "Apple\\ SD\\ Gothic\\ Neo",
        "Noto\\ Sans\\ KR",
        "Malgun\\ Gothic",
        "Apple\\ Color\\ Emoji",
        "Segoe\\ UI\\ Emoji",
        "Segoe\\ UI\\ Symbol",
        "sans-serif",
      ],
    },
    screens,
    extend: {
      colors: {
        "dark-blue": {
          50: "#FAF9FF",
          100: "#F4F4FF",
          200: "#EBE9FF",
          300: "#DDDAFF",
          400: "#7E73FF",
          500: "#6F63FF",
          600: "#5A4CFF",
          700: "#473ADA",
          800: "#3C30C0",
          900: "#2E24A1",
          950: "#281F8B",
        },
        red: {
          500: "#EF4444",
        },
      },
    },
  },
  plugins: [typography],
};

export default config;
