import styles from "@styles-components/reusable/Resizer.module.scss";
import { ResizerProps as Props } from "@models/Props";

export default function Resizer({ prop__fn_handle__mouse_move__box }: Props): JSX.Element {
  return (
    <div
      className={styles.box}
      style={{
        width: "1px",
        height: "100%",
      }}
      onMouseDown={(e) => {
        e.stopPropagation();
        window.addEventListener("mousemove", prop__fn_handle__mouse_move__box);
      }}
    />
  );
}