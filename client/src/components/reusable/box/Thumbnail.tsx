import Img from "@/components/reusable/box/Image";
import type { I_div_bs_props } from "@/models/props";

export default function Thumb({ cssModule, className, prop__element }: I_div_bs_props) {
  return (
    <div className={`${cssModule?.box} ${cssModule?.thumb} ${className}`}>
      <Img cssModule={cssModule} className={cssModule?.thumb} prop__element={prop__element} />
    </div>
  );
}
