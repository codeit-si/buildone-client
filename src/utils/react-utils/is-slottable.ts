import { isValidElement } from "react";

import Slottable from "@/components/@common/slot/slottable";

const isSlottable = (
  child: React.ReactNode,
): child is React.ReactElement<
  React.ComponentProps<typeof Slottable>,
  typeof Slottable
> => {
  return isValidElement(child) && child.type === Slottable;
};

export default isSlottable;
