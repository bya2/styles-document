import { I_div_props, I_re_props } from "@/models/props";

interface I_grp_props extends I_re_props, I_div_props {}

export default function Group({ children, style_obj, className, _classes, ...props }: I_grp_props): JSX.Element {
  return (
    <div {...props} className={`${style_obj?.group} ${style_obj[className || ""]} ${_classes}`}>
      <>{children}</>
    </div>
  );
}
