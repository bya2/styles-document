import { Props } from "@/models/Props";

export default function Outer({ children, cssModule, className, onMouseDown, onMouseUp }: Props) {
  return (
    <div className={`${cssModule?.wrapper} ${cssModule?.outer} ${className}`} onMouseDown={onMouseDown} onMouseUp={onMouseUp}>
      {children}
    </div>
  );
}
