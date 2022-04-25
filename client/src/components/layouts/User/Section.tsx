import type { I_div_bs_props } from "@/models/props"

export default function Section({ children }: I_div_bs_props): JSX.Element {
  return (
    <section className="page__user">
      <>
        {children}
      </>
    </section>
  )
}