import React from "react";
import type { Props } from "@models/Props";

function Input(
  {
    type = "text",
    id,
    name,
    className,
    placeholder,
    disabled,
    value,
    inlineStyle,
    autoFocus,
    autoComplete,
    tabIndex,
    onChange,
    onKeyUp,
    onKeyDown,
    onFocus,
    onBlur,
    onClick,
  }: Props,
  ref: React.LegacyRef<HTMLInputElement> | undefined
) {
  return (
    <input
      type={type}
      id={id}
      name={name}
      className={className}
      style={inlineStyle}
      placeholder={placeholder}
      disabled={disabled}
      autoFocus={autoFocus}
      autoComplete={autoComplete}
      tabIndex={tabIndex}
      value={value}
      onChange={onChange}
      onKeyUp={onKeyUp}
      onKeyDown={onKeyDown}
      onFocus={onFocus}
      onBlur={onBlur}
      onClick={onClick}
      ref={ref}
    />
  );
}

const CompRefInput = React.forwardRef(Input);
export default CompRefInput;