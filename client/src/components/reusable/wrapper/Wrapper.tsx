import { Props } from "@/models/Props";

export default function Wrapper({ children, cssModule, className }: Props) {
  return (
    <div className={`${cssModule?.area} ${cssModule?.wrapper} ${className}`}>
      <>{children}</>
    </div>
  );
}
