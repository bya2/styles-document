import { Props } from "@/models/Props";

interface I_props extends Props {
  prop__title?: string;
  prop__volume?: string;
}

export default function Info({ cssModule, className, prop__title, prop__volume }: I_props) {
  return (
    <div className={`${cssModule?.box} ${cssModule?.info} ${className}`}>
      <span className={cssModule?.title}>{prop__title}</span>
      <span className={cssModule?.volume}>{prop__volume}</span>
    </div>
  );
}
