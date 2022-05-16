import styles from "@styles-components/Document.module.scss";
import UList from "@/components/reusable/bar/UList";
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
