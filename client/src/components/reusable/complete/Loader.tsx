import { I_div_bs_props } from "@/models/props";

export default function Loader({ cssModule, className }: I_div_bs_props): JSX.Element {
  return (
    <div className={`${cssModule?.box} ${cssModule?.loader} ${className}`}>
      <span />
    </div>
  );
}
