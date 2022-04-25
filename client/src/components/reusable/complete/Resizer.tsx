import styles from "@styles-components/Resizer.module.scss";
import { T_Handler } from "@/models/function";

interface I_props {
  prop__handler__mouse_move__box: T_Handler<MouseEvent>;
}

export default function Resizer({ prop__handler__mouse_move__box }: I_props): JSX.Element {
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
