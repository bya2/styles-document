import { Props } from "@/models/Props";

export default function Site({ children, cssModule, className, tabIndex, onClick, onMouseDown, onFocus, onBlur }: Props): JSX.Element {
  return (
    <div
      className={`${cssModule?.area} ${cssModule?.site} ${className}`}
      tabIndex={tabIndex}
      onClick={onClick}
      onMouseDown={onMouseDown}
      onFocus={onFocus}
      onBlur={onBlur}
    >
      <>{children}</>
    </div>
  );
}
