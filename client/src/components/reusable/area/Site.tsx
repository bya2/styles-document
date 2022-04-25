import { I_div_bs_props } from "@/models/props";

export default function Site({
  children,
  cssModule,
  className,
  tabIndex,
  onClick,
  onMouseDown,
  onFocus,
  onBlur,
}: I_div_bs_props): JSX.Element {
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
