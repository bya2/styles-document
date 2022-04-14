import { Props } from "@/models/Props";

export default function Loader({ cssModule, className }: Props): JSX.Element {
  return (
    <div className={`${cssModule?.wrapper} ${cssModule?.loader} ${className}`}>
      <span className={cssModule?.spinner}/>
    </div>
  );
}
