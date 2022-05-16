import type { I_li_bs_props } from "@/models/props";

export default function Item({ children, cssModule, className, prop__id, ...props }: I_li_bs_props) {
  return (
    <li {...props} data-id={prop__id} className={`${cssModule?.group} ${cssModule?.item} ${className}`}>
      <>{children}</>
    </li>
  );
}
