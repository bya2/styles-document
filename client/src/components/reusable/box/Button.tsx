import type { Props } from "@/models/Props";

export default function Button({
  cssModule,
  className,
  buttonType = "submit",
  prop__element,
  onMouseDown,
  onClick,
}: Props): JSX.Element {
  return (
    <div className={`${cssModule?.box} ${cssModule?.button} ${className}`} onMouseDown={onMouseDown} onClick={onClick}>
      <button type={buttonType}>{prop__element}</button>
    </div>
  );
}
