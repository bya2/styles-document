import type { Props as baseProps } from "@/models/Props";

interface Props extends baseProps{
  prop__title?: string;
  prop__sub?: string;
}

export default function Title({ cssModule, className, prop__title, prop__sub }: Props): JSX.Element {
  return (
    <div className={`${className} ${cssModule?.box} ${cssModule?.title}`}>
      <h3>{prop__title}</h3>
      {prop__sub ? <span>{prop__sub}</span> : null}
    </div>
  );
}
