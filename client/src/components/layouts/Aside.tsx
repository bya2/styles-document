import type { HTMLAttributes } from "react";

interface I_props extends HTMLAttributes<HTMLElement> {}

export default function Aside({ children, className }: I_props): JSX.Element {
  return (
    <aside className={className}>
      <>{children}</>
    </aside>
  );
}
