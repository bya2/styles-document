import type { I_form_bs_props } from "@/models/props";

export default function Container({ children, cssModule, className, onSubmit }: I_form_bs_props): JSX.Element {
  return (
    <div className={`${cssModule?.area} ${cssModule?.container} ${className}`}>
      <form onSubmit={onSubmit}>
        <>{children}</>
      </form>
    </div>
  );
}
