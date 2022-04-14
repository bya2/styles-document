import type { Props as baseProps } from "@models/Props";

interface Props extends baseProps {
  prop__legend?: string;
}

export default function Field({ children, cssModule, className, prop__legend, tabIndex, }: Props): JSX.Element {
  return (
    <fieldset className={`${cssModule?.bar} ${cssModule?.fieldset} ${className}`} tabIndex={tabIndex}>
      <>
        <legend>{prop__legend}</legend>
        {children}
      </>
    </fieldset>
  );
}
