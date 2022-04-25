import UList from "@/components/reusable/bar/UList";
import Item from "@/components/reusable/group/Item";
import styles from "@/styles/components/Search.module.scss";

export default function SearchItemBar() {
  return (
    <UList cssModule={styles} className={styles.s_item}>
      {[].map((obj) => {
        return <Item cssModule={styles} className={styles.s_item}></Item>;
      })}
    </UList>
  );
}
