import {
  Children,
  cloneElement,
  HTMLAttributes,
  isValidElement,
  ReactNode,
} from "react";

import isSlottable from "@/utils/react-utils/is-slottable";

import SlotClone from "../../../utils/react-utils/slot-clone";

interface SlotProps extends HTMLAttributes<HTMLElement> {
  children?: ReactNode;
}

export default function Slot(props: SlotProps) {
  const { children, ...slotProps } = props;

  const childrenArray = Children.toArray(children);
  const slottable = childrenArray.find(isSlottable);

  if (slottable) {
    const newElement = slottable.props.children as React.ReactNode;

    const newChildren = childrenArray.map((child) => {
      if (child === slottable) {
        if (Children.count(newElement) > 1) return null;
        return isValidElement(newElement)
          ? (newElement.props.children as ReactNode)
          : null;
      }
      return child;
    });

    return (
      <SlotClone {...slotProps}>
        {isValidElement(newElement)
          ? cloneElement(newElement, undefined, newChildren)
          : null}
      </SlotClone>
    );
  }
  return <SlotClone {...slotProps}>{children}</SlotClone>;
}
