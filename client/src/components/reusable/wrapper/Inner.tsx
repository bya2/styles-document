import { I_div_bs_props } from "@/models/props";

export default function Inner({ children, cssModule, className, onMouseDown }: I_div_bs_props) {
  return (
    <div className={`${cssModule?.wrapper} ${cssModule?.inner} ${className}`} onMouseDown={onMouseDown}>
      <>{children}</>
    </div>
  );
}
