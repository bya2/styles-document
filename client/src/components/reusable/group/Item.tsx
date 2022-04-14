import type { Props } from "@/models/Props";

export default function Item({
  children,
  cssModule,
  className,
  prop__id,
  prop__key,
  onClick,
  onMouseDown,
  onMouseUp,
  onMouseEnter,
  onMouseLeave,
}: Props) {
  return (
    <li
      data-id={prop__id}
      data-key={prop__key}
      className={`${cssModule?.group} ${cssModule?.item} ${className}`}
      onClick={onClick}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <>{children}</>
    </li>
  );
}
