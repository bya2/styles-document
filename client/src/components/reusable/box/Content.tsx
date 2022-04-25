import type { I_div_bs_props } from "@/models/props";

interface I_props extends I_div_bs_props {
  prop__is_tooltip?: boolean;
}

export default function Content({ className, cssModule, inlineStyle, prop__content, prop__is_tooltip }: I_props): JSX.Element {
  return (
    <div
      className={`${cssModule?.box} ${cssModule?.content} ${className} ${prop__is_tooltip ? cssModule?.s__tooltip : ""}`}
      style={inlineStyle}
    >
      <span>{prop__content}</span>
    </div>
  );
}
