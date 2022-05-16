import styles from "@styles-components/Document.module.scss";
import Item from "@/components/reusable/group/Item";
// import Thumb from "@/components/reusable/box/Thumbnail";
import Info from "@/components/reusable/box/Info";

interface I_props {
  prop__type?: string;
}

export default function Elem({ prop__type }: I_props) {
  return (
    <Item cssModule={styles}>
      {/* <Thumb cssModule={styles} /> */}
      <Info cssModule={styles} prop__title={""} />
    </Item>
  );
}
