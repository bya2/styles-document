import { Props } from "@/models/Props";

export default function Textarea({
  id,
  name,
  className,
  inlineStyle,
  rows,
  placeholder,
  defaultValue,
  value,
  onChange,
  onMouseDown,
  onClick,
  onKeyDown,
}: Props) {
  return (
    <textarea
      id={id}
      name={name}
      className={className}
      style={inlineStyle}
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
