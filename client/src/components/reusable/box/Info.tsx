import { I_div_bs_props } from "@/models/props";

export default function Info({ cssModule, className, prop__title, prop__volume }: I_div_bs_props) {
  return (
    <div className={`${cssModule?.box} ${cssModule?.info} ${className}`}>
      <span className={cssModule?.title}>{prop__title}</span>
      <span className={cssModule?.volume}>{prop__volume}</span>
    </div>
  );
}
