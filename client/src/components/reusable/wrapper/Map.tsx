import { Props } from "@/models/Props";

export default function Map({ children, cssModule, className }: Props) {
  return (
    <div className={`${cssModule?.wrapper} ${cssModule?.map} ${className}`}>
      <>{children}</>
    </div>
  );
}
