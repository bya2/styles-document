import styles from "@/styles/components/Bookmark.module.scss";
import Region from "@/components/reusable/area/Region";
import Title from "@/components/reusable/box/Title";
import Map from "@/components/reusable/wrapper/Map";
import { useAppSelector } from "@/store/hooks";
import UList from "@/components/reusable/bar/UList";
import Item from "@/components/reusable/group/Item";
import Content from "@/components/reusable/box/Content";
import { Link } from "react-router-dom";

export default function Bookmark() {
  const s__bm__items__arr = useAppSelector((s) => s.bookmark.items);

  return (
    <Map cssModule={styles} className={styles.bookmark}>
      <Region cssModule={styles} className={styles.top}>
        <Title cssModule={styles} prop__title={"Bookmark"} />
      </Region>
      <Region cssModule={styles} className={styles.bot}>
        <UList cssModule={styles}>
          {s__bm__items__arr.map((_id) => {
            return (
              <Item key={_id} prop__id={_id} cssModule={styles}>
                <Link to={_id}>
                  <Content cssModule={styles} prop__content={_id} />
                </Link>
              </Item>
            );
          })}
        </UList>
      </Region>
    </Map>
  );
}
