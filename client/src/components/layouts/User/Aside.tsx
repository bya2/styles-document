import type { IWrapperProps as Props } from "@/models/Props";

export default function Aside({ children }: Props): JSX.Element {
  return (
    <aside className="page__user">
      <>
        {children}
      </>
    </aside>
  )
}