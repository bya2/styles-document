import type { I_re_props, I_form_props } from "@/models/props";

export interface I_container_props extends I_re_props, I_form_props {}

export default function Container({ children, style_obj, className, _class, ...props }: I_container_props): JSX.Element {
  return (
    <div className={`${style_obj.area} ${style_obj.container} ${style_obj[className || ""]} ${_class}`}>
      <form {...props}>
        <>{children}</>
      </form>
    </div>
  );
}
