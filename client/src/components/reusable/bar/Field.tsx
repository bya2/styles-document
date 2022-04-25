import type { I_fs_bs_props } from "@/models/props";

export default function Field({ children, cssModule, className, prop__legend, tabIndex }: I_fs_bs_props): JSX.Element {
  return (
    <fieldset className={`${cssModule?.bar} ${cssModule?.fieldset} ${className}`} tabIndex={tabIndex}>
      <>
        <legend>{prop__legend}</legend>
        {children}
      </>
    </fieldset>
  );
}
