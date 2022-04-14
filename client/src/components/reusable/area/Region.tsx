import { Props } from "@/models/Props";

export default function Region({ children, cssModule, className, inlineStyle }: Props) {
  return (
    <div className={`${cssModule?.area} ${cssModule?.region} ${className}`} style={inlineStyle}>
      <>{children}</>
    </div>
  );
}
