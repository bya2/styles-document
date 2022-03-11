export default function CompInput({
  type,
  id,
  name,
  className,
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
}) {
  return (
    <input
      type={type}
      id={id}
      name={name}
      className={className}
      placeholder={placeholder}
      disabled={disabled}
      value={value}
      autoFocus={autoFocus}
      autoComplete={autoComplete === undefined ? undefined : !autoComplete || autoComplete === "off" ? "off" : "on"}
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
