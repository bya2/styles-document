import type { I_div_bs_props } from "@/models/props";

export default function Box(props: I_div_bs_props) {
  const { children, cssModule, className, prop__id, onClick, ...div_props } = props;
  
  return (
    <div {...div_props} data-id={prop__id} className={`${cssModule?.box} ${className}`} onClick={onClick}>
      {children}
    </div>
  );
}
