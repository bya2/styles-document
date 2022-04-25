import { useAppSelector } from "@store/hooks";
import type { I_div_bs_props } from "@/models/props"

export default function Main({ children }: I_div_bs_props): JSX.Element {
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