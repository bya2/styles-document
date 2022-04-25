import styles from "@/styles/components/Bookmark.module.scss";
import Region from "@/components/reusable/area/Region";
import Title from "@/components/reusable/box/Title";
import Map from "@/components/reusable/wrapper/Map";

export default function Bookmark() {
  return (
    <Map cssModule={styles} className={styles.bookmark}>
      <Region cssModule={styles} className={styles.top}>
        <Title cssModule={styles} prop__title={"Bookmark"} />
      </Region>
    </Map>
  );
}
