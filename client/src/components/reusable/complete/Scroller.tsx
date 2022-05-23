import styles from "@/styles/components/Scroller.module.scss";
import { I_div_attrs } from "@/models/props";

interface I_props extends I_div_attrs {}

export default function Scroller({ children }: I_props) {
  return (
    <div className={`${styles.wrapper} ${styles.scroller}`}>
      <>{children}</>
    </div>
  );
}
