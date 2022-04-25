import { I_div_bs_props } from "@/models/props";

export default function Scroller({ children, cssModule, className }: I_div_bs_props) {
  return (
    <div className={`${cssModule?.wrapper} ${cssModule?.scroller} ${className}`}>
      <>{children}</>
    </div>
  );
}
