import type { Props } from "@/models/Props";

export default function Button({ cssModule, className, buttonType = "submit", value }: Props): JSX.Element {
  return (
    <div className={`${cssModule?.box} ${cssModule?.button} ${className}`}>
      <button type={buttonType}>{value}</button>
    </div>
  );
}
