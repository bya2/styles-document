import styles from "@styles-components/Visit.module.scss";
import Region from "@/components/reusable/area/Region";
import Title from "@/components/reusable/box/Title";
import Map from "@/components/reusable/wrapper/Map";
import RecentBar from "./RecentBar";

export default function VisitMap() {
  return (
    <Map cssModule={styles} className={styles.visit}>
      <Region cssModule={styles} className={styles.top}>
        <Title cssModule={styles} prop__title={"Recent Visit Pages"} />
      </Region>

      <Region cssModule={styles} className={styles.bot}>
        <RecentBar />
      </Region>
    </Map>
  );
}
