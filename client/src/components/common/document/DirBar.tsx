import styles from "@styles-components/Document.module.scss";
import Msgs from "@/components/reusable/bar/Messages";

export default function DirBar() {
  return <Msgs cssModule={styles} className={styles.dir} prop__messages={[]} />;
}
