import type { I_li_bs_props } from "@/models/props";
import { LiHTMLAttributes } from "react";

export default function Item(props: I_li_bs_props) {
  const { children, cssModule, className, prop__id } = props;

  return (
    <li {...props} data-id={prop__id} className={`${cssModule?.group} ${cssModule?.item} ${className}`}>
      <>{children}</>
    </li>
  );
}
