import { Props } from "@/models/Props";

export default function Outer({ children, cssModule, className }: Props) {
  return (
    <div className={`${cssModule?.wrapper} ${cssModule?.inner} ${className}`}>
      <>{children}</>
    </div>
  );
}
