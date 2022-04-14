import type { Props } from "@/models/Props";

export default function Area({ children, cssModule, className, inlineStyle, prop__id }: Props) {
  return (
    <div data-id={prop__id} className={`${cssModule?.area} ${className}`} style={inlineStyle}>
      <>{children}</>
    </div>
  );
}
