import type { I_div_bs_props } from "@/models/props";

interface I_props extends I_div_bs_props {
  buttonType?: "button" | "submit" | "reset";
}

export default function Button(props: I_props): JSX.Element {
  const { buttonType, cssModule, className, prop__element, ...div_props } = props;

  return (
    <div {...div_props} className={`${cssModule?.box} ${cssModule?.button} ${className}`}>
      <button type={buttonType}>
        {prop__element}
      </button>
    </div>
  );
}
