import styles from "@styles-components/Document.module.scss";
import UList from "@/components/reusable/bar/UList";
import Thumb from "@/components/reusable/box/Thumbnail";
import Item from "@/components/reusable/group/Item";
import Box from "@/components/reusable/box/Box";
import Info from "@/components/reusable/box/Info";
import Elem from "./Elem";

export default function ElemBar() {
  return (
    <UList cssModule={styles} className={styles.elem}>
      {[].map((doc_elem__obj) => {
        const {} = doc_elem__obj;
        return (
          <Elem key={1} />
        );
      })}
    </UList>
  );
}
