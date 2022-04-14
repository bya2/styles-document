import type { Props as baseProps } from "@/models/Props";

interface Props extends baseProps {
  prop__is_tooltip?: boolean;
}

export default function Content({ className, cssModule, inlineStyle, prop__content, prop__is_tooltip }: Props): JSX.Element {
  return (
    <div
      className={`${cssModule?.box} ${cssModule?.content} ${className} ${prop__is_tooltip ? cssModule?.s__tooltip : ""}`}
      style={inlineStyle}
    >
      <span>{prop__content}</span>
    </div>
  );
}
