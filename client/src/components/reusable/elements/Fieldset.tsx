import type { FieldsetProps as Props } from "@models/Props";

export default function Fieldset({ children, className, prop__legend }: Props): JSX.Element {
  return (
    <fieldset className={className}>
      <legend>{prop__legend}</legend>
      {children}
    </fieldset>
  );
}
