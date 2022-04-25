import styles from "@styles-components/Document.module.scss";
import Map from "@/components/reusable/wrapper/Map";
import Region from "@/components/reusable/area/Region";
import TabBar from "./TabBar";
import ThumbBar from "./ThumbBar";
import DirBar from "./DirBar";

export default function Document() {
  return (
    <Map cssModule={styles}>
      <Region cssModule={styles} className={styles.top}>
        <TabBar />
      </Region>

      <Region cssModule={styles} className={styles.middle}>
        <DirBar />
      </Region>

      <Region cssModule={styles} className={styles.bottom}>
        <ThumbBar />
        <div>322</div>
      </Region>
    </Map>
  );
}
