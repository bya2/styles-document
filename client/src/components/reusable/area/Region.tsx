import { I_div_bs_props } from "@/models/props";

export default function Region({ children, cssModule, className, inlineStyle, onMouseEnter }: I_div_bs_props) {
  return (
    <div className={`${cssModule?.area} ${cssModule?.region} ${className}`} style={inlineStyle} onMouseEnter={onMouseEnter}>
      <>{children}</>
    </div>
  );
}
