import styles from "@styles-components/Document.module.scss";
import { useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { set_s__exp_nodes__is_active_node, slice_s__exp_open_nodes__arr } from "@/store/common/explorer";
import UList from "@/components/reusable/bar/UList";
import Item from "@/components/reusable/group/Item";
import Img from "@/components/reusable/box/Image";
import Content from "@/components/reusable/box/Content";
import Btn from "@/components/reusable/box/Button";

export default function TabBar() {
  const { param__user_id } = useParams();
  const navigate = useNavigate();

  const s__exp_nodes__is_active_node__map = useAppSelector((s) => s.explorer.nodes.is_active_node__map);
  const s__exp_open_nodes__arr = useAppSelector((s) => s.explorer.open_nodes.arr);
  const dispatch = useAppDispatch();

  const cb_handle__click__item = useCallback(
    (_node_id: string) => {
      dispatch(set_s__exp_nodes__is_active_node(_node_id));
      navigate(`?doc=${_node_id}`);
    },
    [dispatch, navigate]
  );

  const cb_handle__click__close_btn = useCallback(
    (_node_id: string) => {
      console.log("click button");
      dispatch(slice_s__exp_open_nodes__arr(_node_id));
      navigate("../");
    },
    [dispatch, navigate]
  );

  return (
    <UList cssModule={styles} className={styles.tabs}>
      {s__exp_open_nodes__arr.map((open_node__obj) => {
        const { id, name } = open_node__obj;
        return (
          <Item
            key={id}
            cssModule={styles}
            className={`${styles.tab} ${s__exp_nodes__is_active_node__map[id] ? styles.s__active : ""}`}
            onClick={(e) => {
              e.stopPropagation();
              cb_handle__click__item(id);
            }}
          >
            <Img cssModule={styles} prop__element={<></>} />
            <Content cssModule={styles} prop__content={name} />
            <Btn
              cssModule={styles}
              className={styles.close}
              prop__element={<span>X</span>}
              onClick={(e) => {
                e.stopPropagation();
                cb_handle__click__close_btn(id);
              }}
            />
          </Item>
        );
      })}
    </UList>
  );
}
