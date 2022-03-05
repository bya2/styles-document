export default function CompTextarea({
  id,
  name,
  className,
  rows,
  placeholder,
  defaultValue,
  value,
  onChange,
  onMouseDown,
  onClick,
  onKeyDown,
}) {
  return (
    <textarea
      id={id}
      name={name}
      className={className}
      rows={rows}
      placeholder={placeholder}
      defaultValue={defaultValue}
      value={value}
      onChange={onChange}
      onMouseDown={onMouseDown}
      onClick={onClick}
      onKeyDown={onKeyDown}
    ></textarea>
  );
}
