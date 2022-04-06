import React from "react";
import type { InputProps as Props } from "@models/Props";

function Input(
  {
    type,
    id,
    name,
    className,
    placeholder,
    disabled,
    value,
    style,
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
  ref: undefined | React.LegacyRef<HTMLInputElement>
) {
  return (
    <input
      type={type}
      id={id}
      name={name}
      className={className}
      placeholder={placeholder}
      disabled={disabled}
      autoFocus={autoFocus}
      autoComplete={autoComplete === undefined ? undefined : !autoComplete || autoComplete === "off" ? "off" : "on"}
      tabIndex={tabIndex}
      value={value}
      onChange={onChange}
      onKeyUp={onKeyUp}
      onKeyDown={onKeyDown}
      onFocus={onFocus}
      onBlur={onBlur}
      onClick={onClick}
      style={style}
      ref={ref}
    />
  );
}

const CompRefInput = React.forwardRef(Input);
export default CompRefInput;