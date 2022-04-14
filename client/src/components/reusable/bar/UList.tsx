import type { Props } from "@/models/Props"

export default function UList({ children, className, cssModule, tabIndex}: Props): JSX.Element {
  return (
    <ul className={`${cssModule?.bar} ${cssModule?.ulist} ${className}`} tabIndex={tabIndex}>
      <>
        {children}
      </>
    </ul>
  )
}