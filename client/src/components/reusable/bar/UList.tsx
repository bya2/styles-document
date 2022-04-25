import type { I_ul_bs_props } from "@/models/props"

export default function UList({ children, className, cssModule, tabIndex}: I_ul_bs_props): JSX.Element {
  return (
    <ul className={`${cssModule?.bar} ${cssModule?.ulist} ${className}`} tabIndex={tabIndex}>
      <>
        {children}
      </>
    </ul>
  )
}