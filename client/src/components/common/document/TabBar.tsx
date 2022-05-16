import styles from "@styles-components/Document.module.scss";
import { useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { set_s__exp_node__is_active, del_s__exp_o_node__uid } from "@/store/common/explorer";
import UList from "@/components/reusable/bar/UList";
import Item from "@/components/reusable/group/Item";
import Img from "@/components/reusable/box/Image";
import Content from "@/components/reusable/box/Content";
import BtnBox from "@/components/reusable/box/Button";
import CloseIcon from "@/assets/icon/explorer/close-outline.svg";

export default function TabBar() {
  const { param__user_id } = useParams();
  const navigate = useNavigate();

  const s__exp_nodes__is_active__cond_map = useAppSelector((s) => s.explorer.nodes.is_active__cond_map);
  const s__exp_o_nodes__arr = useAppSelector((s) => s.explorer.o_nodes.arr);
  const dispatch = useAppDispatch();

  const cb_handle__click__item = useCallback(
    (e: React.MouseEvent, _node_id: string) => {
      e.stopPropagation();
      dispatch(set_s__exp_node__is_active({ uid: _node_id, cond: true }));
      navigate(`?doc=${_node_id}`);
    },
    [dispatch, navigate]
  );

  const cb_handle__click__close_btn = useCallback(
    (e: React.MouseEvent, _node_id: string) => {
      e.stopPropagation();
      dispatch(del_s__exp_o_node__uid({ uid: _node_id }));
      navigate("../");
    },
    [dispatch, navigate]
  );

  return (
    <UList cssModule={styles} className={styles.tabs}>
      {s__exp_o_nodes__arr.map((o_node) => {
        const { uid, name } = o_node;
        return (
          <Item
            key={uid}
            cssModule={styles}
            className={`${styles.tab} ${s__exp_nodes__is_active__cond_map[uid] ? styles.s__active : ""}`}
            onClick={(e) => cb_handle__click__item(e, uid)}
          >
            <Img cssModule={styles} prop__element={<></>} />
            <Content cssModule={styles} prop__content={name} />
            <BtnBox
              style_obj={styles}
              className={"close"}
              onClick={(e) => cb_handle__click__close_btn(e, uid)}
              _image={CloseIcon}
            />
          </Item>
        );
      })}
    </UList>
  );
}
