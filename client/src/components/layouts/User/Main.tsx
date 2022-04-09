import { useAppSelector } from "@store/hooks";
import type { IWrapperProps as Props } from "@/models/Props"

export default function Main({ children }: Props): JSX.Element {
  const s__aside_posX__num = useAppSelector(s => s.resizer.aside_posX__num);

  return (
    <main
      className="page__user"
      style={{
        gridTemplateColumns: `${s__aside_posX__num}px 0 1fr`,
      }}
    >
      <>
        {children}
      </>
    </main>
  )
}