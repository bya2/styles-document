import { HTMLAttributes } from "react";

interface I_props extends HTMLAttributes<HTMLElement> {}

export default function Section({ children, className }: I_props): JSX.Element {
  return (
    <section className={className}>
      <>{children}</>
    </section>
  );
}
