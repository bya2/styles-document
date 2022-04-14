import styles from "@styles-components/reusable/Resizer.module.scss";
import { ResizerProps as Props } from "@models/Props";

export default function Resizer({ prop__handler__mouse_move__box }: Props): JSX.Element {
  return (
    <div
      className={styles.box}
      onMouseDown={(e) => {
        e.stopPropagation();
        window.addEventListener("mousemove", prop__handler__mouse_move__box);
      }}
    />
  );
}