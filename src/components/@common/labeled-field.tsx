import React, { HTMLAttributes, LabelHTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/cn";

import Label from "./label";

interface LabeledFieldProps extends HTMLAttributes<HTMLDivElement> {
  label: ReactNode;
  htmlFor: LabelHTMLAttributes<HTMLLabelElement>["htmlFor"];
  children: ReactNode;
}

export default function LabeledField({
  label,
  htmlFor,
  className,
  children,
  ...props
}: LabeledFieldProps) {
  return (
    <div className={cn("flex flex-col", className)} {...props}>
      <Label htmlFor={htmlFor} className="mb-12">
        {label}
      </Label>
      {children}
    </div>
  );
}
