import styles from "@styles-components/common/Activity.module.scss";

import ToolBar from "./ToolBar";
import StatusBar from "./StatusBar";

export default function Activity() {
  return (
    <div className={styles.wrapper}>
      <ToolBar />
      <StatusBar />
    </div>
  )
}