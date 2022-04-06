interface Props {
  className?: string;
  prop__icon?: string;
}

export default function IconBox({ className, prop__icon }: Props): JSX.Element {
  return (
    <div className={className}>
      <i className={`icon ${prop__icon}`} />
    </div>
  );
}
