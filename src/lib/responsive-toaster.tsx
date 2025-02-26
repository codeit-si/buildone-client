"use client";

import { useEffect, useState } from "react";
import { Toaster, ToasterProps } from "react-hot-toast";

import { screens } from "../../tailwind.config";

export default function ResponsiveToaster() {
  const [position, setPosition] =
    useState<ToasterProps["position"]>("top-right");

  useEffect(() => {
    const md = parseInt(screens.md, 10);
    const lg = parseInt(screens.lg, 10);

    const updatePosition = () => {
      if (window.innerWidth < md) {
        setPosition("bottom-center"); // 모바일
      } else if (window.innerWidth < lg) {
        setPosition("top-center"); // 태블릿
      } else {
        setPosition("top-right"); // 데스크탑
      }
    };

    updatePosition();
    window.addEventListener("resize", updatePosition);
    return () => window.removeEventListener("resize", updatePosition);
  }, []);

  return <Toaster position={position} />;
}
