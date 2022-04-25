import styles from "@styles-components/Activity.module.scss";

import ToolBar from "./ToolBar";
import RootBar from "./RootBar";
import StatusBar from "./StatusBar";
import Map from "@/components/reusable/wrapper/Map";
import Region from "@/components/reusable/area/Region";

export default function Activity() {
  return (
    <Map cssModule={styles} className={styles.act}>
      <Region cssModule={styles} className={styles.top}>
        <ToolBar />
      </Region>
    </Map>
  );
}
