import type { I_ul_bs_props } from "@/models/props";

export default function UList({ children, className, style_obj, cssModule, tabIndex, ...props }: I_ul_bs_props): JSX.Element {
  return (
    <ul
      {...props}
      className={`${cssModule?.bar} ${style_obj?.bar} ${style_obj?.ulist} ${cssModule?.ulist} ${className}`}
      tabIndex={tabIndex}
    >
      <>{children}</>
    </ul>
  );
}
