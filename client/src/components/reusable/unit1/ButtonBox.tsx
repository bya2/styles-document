import type { IButtonAttrProps as Props } from "@models/Props";

export default function ButtonBox({ className, type = "submit", value }: Props) {
  return (
    <div className={className}>
      <button type={type}>{value}</button>
    </div>
  );
}
