import styles from "@styles-components/reusable/Tooltip.module.scss";
import { createPortal } from "react-dom";

interface Props {
  prop__content?: string;
  prop__mouse_pointer_pos: [number, number];
  prop__is_show?: boolean;
}

export default function Tooltip({
  prop__content,
  prop__mouse_pointer_pos,
  prop__is_show = false,
}: Props): React.ReactPortal | JSX.Element {
  return prop__is_show ? (
    createPortal(
      <div
        className={`${styles.box} ${styles.tooltip}`}
        style={{
          left: `${prop__mouse_pointer_pos[0] + 10}px`,
          top: `${prop__mouse_pointer_pos[1] + 10}px`,
        }}
      >
        <span>{prop__content}</span>
      </div>,
      document.getElementById("tooltip") as HTMLElement
    )
  ) : (
    <></>
  );
}
