import styles from "@styles/components/Editor.module.scss";
import { useAppDispatch } from "@/store/hooks";

const MSG__EDITOR__TXTA_PLACEHOLDER = "";

export default function Editor() {
  const dispatch = useAppDispatch();

  const cb_listen__change__txta_val = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.stopPropagation();
  };

  return (
    <div className={`${styles.wrapper} ${styles.editor}`}>
      <div className={styles.line}></div>
      <textarea className={styles.text} placeholder={MSG__EDITOR__TXTA_PLACEHOLDER} onChange={cb_listen__change__txta_val} />
    </div>
  );
}
