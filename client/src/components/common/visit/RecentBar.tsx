import styles from "@styles-components/Visit.module.scss";
import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { set_s__act_tool__is_active } from "@/store/common/activity";
import { Link } from "react-router-dom";
import UList from "@/components/reusable/bar/UList";
import Item from "@/components/reusable/group/Item";

export default function RecentBar() {
  const s__act_r_nodes__arr = useAppSelector((s) => s.activity.r_nodes.arr);
  const dispatch = useAppDispatch();

  const cb_handle__click__visit_item = useCallback(
    (e: React.MouseEvent<HTMLLIElement>, _id: string) => {
      e.stopPropagation();
      dispatch(set_s__act_tool__is_active({ id: "explorer", cond: true }));
    },
    [dispatch]
  );

  return (
    <UList cssModule={styles} className={styles.recent}>
      {s__act_r_nodes__arr.map((item__obj) => {
        const { id, occured_at } = item__obj;
        return (
          <Item key={id} cssModule={styles} className={styles.recent} onClick={(e) => cb_handle__click__visit_item(e, id)}>
            <Link to={`/${id}`}>
              <span>{id}</span>
              <span>{occured_at}</span>
            </Link>
          </Item>
        );
      })}
    </UList>
  );
}
