import { I_li_props, I_re_props } from "@/models/props";

export interface I_thumb_grp_props extends I_re_props, I_li_props {}

export default function ThumbItem({ children, style_obj, className, _classes, ...props }: I_thumb_grp_props): JSX.Element {
  return (
    <li {...props} className={`${style_obj.item} ${style_obj.thumb} ${style_obj[className || ""]} ${_classes}`}>
      <>{children}</>
    </li>
  );
}
