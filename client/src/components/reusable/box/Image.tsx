import type { Props } from "@/models/Props";

export default function Img({ className, cssModule, prop__element }: Props): JSX.Element {
  return <div className={`${className} ${cssModule?.box} ${cssModule?.image}`}>{prop__element}</div>;
}
