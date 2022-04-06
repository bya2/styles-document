interface Props {
  className?: string;
  prop__content?: string;
  prop__is_tooltip?: boolean;
}

export default function ContentBox({ className, prop__content, prop__is_tooltip = false }: Props) {
  return (
    <div className={`${className} ${prop__is_tooltip ? "s__tooltip" : ""}`}>
      <span className="content">{prop__content}</span>
    </div>
  );
}
