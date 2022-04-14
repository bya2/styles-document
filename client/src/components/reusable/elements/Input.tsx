import type { Props } from "@models/Props";

export default function Input({
  type,
  id,
  name,
  className,
  inlineStyle,
  placeholder,
  disabled,
  value,
  autoFocus,
  autoComplete,
  tabIndex,
  onChange,
  onKeyUp,
  onKeyDown,
  onFocus,
  onBlur,
  onClick,
}: Props) {
  return (
    <input
      type={type}
      id={id}
      name={name}
      className={className}
      style={inlineStyle}
      placeholder={placeholder}
      disabled={disabled}
      value={value}
      autoFocus={autoFocus}
      autoComplete={autoComplete}
      tabIndex={tabIndex}
      onChange={onChange}
      onKeyUp={onKeyUp}
      onKeyDown={onKeyDown}
      onFocus={onFocus}
      onBlur={onBlur}
      onClick={onClick}
    />
  );
}