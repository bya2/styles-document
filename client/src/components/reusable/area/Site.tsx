import { Props } from "@/models/Props";

export default function Site({ children, cssModule, className }:Props): JSX.Element {
  return (
    <div className={`${cssModule?.area} ${cssModule?.site} ${className}`}>
      <>
        {children}
      </>
    </div>
  )
}