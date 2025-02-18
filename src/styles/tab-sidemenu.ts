import { cva } from "class-variance-authority";

export const desktopButtonStyle = cva(
  "hidden w-full font-normal md:flex lg:flex",
);
export const mobileButtonStyle = cva(
  "mr-20 flex max-h-36 min-h-36 min-w-84 max-w-84 p-0 md:hidden",
);
