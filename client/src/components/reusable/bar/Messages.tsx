import { I_div_bs_props } from "@/models/props";

interface I_props extends I_div_bs_props {
  prop__messages?: string[];
}

export default function Msgs({ cssModule, className, prop__messages, onClick }: I_props) {
  return (
    <div className={`${className} ${cssModule?.bar} ${cssModule?.messages}`} onClick={onClick}>
      <>
        {prop__messages?.map((message, i) => {
          return <span key={`message${i}`}>{message}</span>;
        })}
      </>
    </div>
  );
}
