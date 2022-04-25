import type { I_div_bs_props } from "@/models/props";

export default function Img({ className, cssModule, prop__element }: I_div_bs_props): JSX.Element {
  return <div className={`${className} ${cssModule?.box} ${cssModule?.image}`}>{prop__element}</div>;
}
