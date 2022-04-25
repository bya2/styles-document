import type { I_div_bs_props } from "@/models/props";

export default function Area({ children, cssModule, className, inlineStyle, prop__id }: I_div_bs_props) {
  return (
    <div data-id={prop__id} className={`${cssModule?.area} ${className}`} style={inlineStyle}>
      <>{children}</>
    </div>
  );
}
