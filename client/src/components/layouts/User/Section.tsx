import type { IWrapperProps as Props } from "@/models/Props"

export default function Section({ children }: Props): JSX.Element {
  return (
    <section className="page__user">
      <>
        {children}
      </>
    </section>
  )
}