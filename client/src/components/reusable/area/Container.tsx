import type { Props } from "@models/Props";

export default function Container({ children, cssModule, className, onSubmit }: Props): JSX.Element {
  return (
    <div className={`${cssModule?.area} ${cssModule?.container} ${className}`}>
      <form onSubmit={onSubmit}>
        <>{children}</>
      </form>
    </div>
  );
}
