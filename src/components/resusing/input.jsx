import React from "react";

const Comp_input__reusing = (
  {
    className,
    type,
    name,
    placeholder,
    disabled,
    value,
    onChange,
    onKeyDown,
    onKeyUp,
    onBlur,
  },
  ref
) => {
  console.log("comp_input__reusing");

  return (
    <input
      className={className}
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      disabled={disabled}
      onChange={onChange}
      onKeyDown={onKeyDown}
      onKeyUp={onKeyUp}
      onBlur={onBlur}
      ref={ref}
    />
  );
};

const forwarded_ref__comp_input__reusing =
  React.forwardRef(Comp_input__reusing);

export default forwarded_ref__comp_input__reusing;
