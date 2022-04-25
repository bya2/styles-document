import { I_div_bs_props } from "@/models/props";

export default function Outer({ children, cssModule, className, onMouseDown, onMouseUp }: I_div_bs_props) {
  return (
    <div className={`${cssModule?.wrapper} ${cssModule?.outer} ${className}`} onMouseDown={onMouseDown} onMouseUp={onMouseUp}>
      {children}
    </div>
  );
}
