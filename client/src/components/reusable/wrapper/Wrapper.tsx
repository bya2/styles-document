import { I_div_bs_props } from "@/models/props";

export default function Wrapper({ children, cssModule, className }: I_div_bs_props) {
  return (
    <div className={`${cssModule?.area} ${cssModule?.wrapper} ${className}`}>
      <>{children}</>
    </div>
  );
}
