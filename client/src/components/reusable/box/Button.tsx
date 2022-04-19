import type { Props } from "@/models/Props";

export default function Btn({
  cssModule,
  className,
  buttonType = "submit",
  prop__element,
  prop__content,
  onClick,
}: Props): JSX.Element {
  return (
    <div className={`${cssModule?.box} ${cssModule?.button} ${className}`} onClick={onClick}>
      <button type={buttonType}>{prop__element ?? prop__content}</button>
    </div>
  );
}
