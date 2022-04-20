import { Props } from "@/models/Props";

export default function Inner({ children, cssModule, className, onMouseDown }: Props) {
  return (
    <div className={`${cssModule?.wrapper} ${cssModule?.inner} ${className}`} onMouseDown={onMouseDown}>
      <>{children}</>
    </div>
  );
}
