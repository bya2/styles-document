import styles from "@styles-components/Document.module.scss";
import UList from "@/components/reusable/bar/UList";
import Item from "@/components/reusable/group/Item";
import Thumb from "@/components/reusable/box/Thumbnail";
import Content from "@/components/reusable/box/Content";

export default function ThumbBar() {
  return (
    <UList cssModule={styles} className={styles.thumb}>
      {[].map((obj) => {
        const {} = obj;
        return (
          <Item cssModule={styles} className={styles.thumb} onClick={(e) => {}}>
            <Thumb cssModule={styles} prop__element={<></>} />
            <Content cssModule={styles} prop__content={""}/> 
          </Item>
        );
      })}
    </UList>
  );
}
