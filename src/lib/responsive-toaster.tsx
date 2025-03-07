"use client";

import { useEffect, useState } from "react";
import { Toaster, ToasterProps } from "react-hot-toast";

import { screens } from "../../tailwind.config";

interface ResponsiveToasterProps {
  sm?: ToasterProps["position"];
  md?: ToasterProps["position"];
  lg?: ToasterProps["position"];
  smOffset?: number;
  mdOffset?: number;
  lgOffset?: number;
}

export default function ResponsiveToaster({
  sm = "top-center",
  md = "top-center",
  lg = "top-center",
  smOffset = 24,
  mdOffset = 32,
  lgOffset = 40,
}: ResponsiveToasterProps) {
  const [position, setPosition] =
    useState<ToasterProps["position"]>("top-right");

  const [offset, setOffset] = useState<number>(smOffset);

  useEffect(() => {
    const mdPoint = parseInt(screens.md, 10);
    const lgPoint = parseInt(screens.lg, 10);

    const updatePosition = () => {
      if (window.innerWidth < mdPoint) {
        // 모바일
        setPosition(sm);
        setOffset(smOffset);
      } else if (window.innerWidth < lgPoint) {
        // 태블릿
        setPosition(md);
        setOffset(mdOffset);
      } else {
        // 데스크탑
        setPosition(lg);
        setOffset(lgOffset);
      }
    };

    updatePosition();
    window.addEventListener("resize", updatePosition);
    return () => window.removeEventListener("resize", updatePosition);
  }, [sm, md, lg, smOffset, mdOffset, lgOffset]);

  return <Toaster position={position} containerStyle={{ top: offset }} />;
}
