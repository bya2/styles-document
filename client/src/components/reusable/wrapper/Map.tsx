import { I_div_bs_props } from "@/models/props";

export default function Map({ children, cssModule, className }: I_div_bs_props) {
  return (
    <div className={`${cssModule?.wrapper} ${cssModule?.map} ${className}`}>
      <>{children}</>
    </div>
  );
}
