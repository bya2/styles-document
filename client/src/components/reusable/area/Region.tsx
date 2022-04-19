import { Props } from "@/models/Props";

export default function Region({ children, cssModule, className, inlineStyle, onMouseEnter }: Props) {
  return (
    <div className={`${cssModule?.area} ${cssModule?.region} ${className}`} style={inlineStyle} onMouseEnter={onMouseEnter}>
      <>{children}</>
    </div>
  );
}
