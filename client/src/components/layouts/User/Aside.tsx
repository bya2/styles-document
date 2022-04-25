import type { I_div_bs_props } from "@/models/props";

export default function Aside({ children }: I_div_bs_props): JSX.Element {
  return (
    <aside className="page__user">
      <>
        {children}
      </>
    </aside>
  )
}