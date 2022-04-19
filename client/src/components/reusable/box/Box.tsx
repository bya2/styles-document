import type { Props } from "@/models/Props";

export default function Box({ children, cssModule, className }: Props) {
  return (
    <div className={`${cssModule?.box} ${className}`}>
      {children}
    </div>
  )
}