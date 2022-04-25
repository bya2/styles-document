import type { I_div_bs_props } from "@/models/props";

export default function Title({ cssModule, className, prop__title, prop__sub_title }: I_div_bs_props): JSX.Element {
  return (
    <div className={`${className} ${cssModule?.box} ${cssModule?.title}`}>
      <h3 className={cssModule?.content}>{prop__title}</h3>
      {prop__sub_title ? <span>{prop__sub_title}</span> : null}
    </div>
  );
}
