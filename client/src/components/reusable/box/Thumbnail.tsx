import Img from "@/components/reusable/box/Image";
import type { Props } from "@/models/Props";

export default function Thumb({ cssModule, className }: Props) {
  return (
    <div className={`${cssModule?.box} ${cssModule?.thumb} ${className}`}>
      <Img cssModule={cssModule} className={cssModule?.thumb} prop__element={<></>} />
    </div>
  );
}
