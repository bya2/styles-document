export function CompInput({ type, id, name, className, placeholder, disabled, value, onChange, onKeyUp, onKeyDown, onBlur }) {
  return (
    <input
      type={type}
      id={id}
      name={name}
      className={className}
      placeholder={placeholder}
      disabled={disabled}
      value={value}
      onChange={onChange}
      onKeyUp={onKeyUp}
      onKeyDown={onKeyDown}
      onBlur={onBlur}
    />
  );
}
