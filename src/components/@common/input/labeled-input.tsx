import {
  forwardRef,
  InputHTMLAttributes,
  LabelHTMLAttributes,
  Ref,
} from "react";

import Label from "../label";

import Input from ".";

interface LabeledInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  labelProps?: LabelHTMLAttributes<HTMLLabelElement>;
}

export default forwardRef(function LabeledInput(
  {
    label,
    labelProps,
    id,
    type,
    value,
    onChange,
    placeholder,
    className,
    ...props
  }: LabeledInputProps,
  ref?: Ref<HTMLInputElement>,
) {
  return (
    <div>
      <Label htmlFor={id} label={label} {...labelProps} />
      <Input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={className}
        ref={ref}
        {...props}
      />
    </div>
  );
});
