import styles from "@styles-components/Explorer.module.scss";
import { useEffect, useCallback } from "react";
import { useAppSelector, useAppDispatch } from "@store/hooks";
import {
  set_s__exp_r_nodes__arr,
  set_s__exp_nodes__is_active__cond_map,
  set_s__exp_f_nodes__is_fold__cond_map,
  set_s__exp_trees__arr,
  set_s__exp_menu_item__open_modal,
  set_s__exp_menu_item__close_modal,
  set_s__exp_nodes__init_cond_map,
  set_s__exp_nodes__arr,
  set_s__exp_nodes__is_loaded,
} from "@/store/common/explorer";
import Map from "@/components/reusable/wrapper/Map";
import Region from "@/components/reusable/area/Region";
import Messages from "@/components/reusable/bar/Messages";
import Title from "@/components/reusable/box/Title";
import Modal from "@/components/reusable/complete/Modal";
import MenuBar from "@/components/common/explorer/MenuBar";
import TreeBar from "@/components/common/explorer/TreeBar";
import ExpRootBar from "@/components/common/explorer/RootBar";
import Loader from "@/components/reusable/complete/Loader";
import { menu_items__arr, messages__no_item__arr } from "./items";
import { fn_get__cond_map_of_uids, fn_handle__error } from "@/logic/reusable";
import {
  fn_get__nodes_of_r_node_uids__arr,
  fn_get__nodes_by_r_node_uid__map,
  fn_get__nodes_by_p_node_uid__map,
  fn_get__layered_nodes__arr,
  fn_get__nodes__cond_map,
  fn_get__r_nodes_of_non_children,
} from "@/logic/explorer";
import { FOLDER_TYPE, ROOT_TYPE } from "@/config/explorer";
import { useParams } from "react-router-dom";

export default function Explorer(): JSX.Element {
  const { userId: param__user_id } = useParams();

  const s__exp = useAppSelector((s) => s.explorer);
  const s__exp_nodes__arr = s__exp.nodes.arr;
  const s__exp_nodes__is_loaded = s__exp.nodes.is_loaded;
  const s__exp_r_nodes__arr = s__exp.r_nodes.arr;
  const s__exp_menus__is_click__cond_map = s__exp.menus.is_click__cond_map;
  const s__exp_trees__arr = s__exp.trees.arr;
  const dispatch = useAppDispatch();

  const cb_get__nodes_of_roots__arr = useCallback(fn_get__nodes_of_r_node_uids__arr, []);
  const cb_get__nodes_by_r_node_uid__map = useCallback(fn_get__nodes_by_r_node_uid__map, []);
  const cb_get__nodes_by_p_node_uid__map = useCallback(fn_get__nodes_by_p_node_uid__map, []);
  const cb_get__layered_nodes__arr = useCallback(fn_get__layered_nodes__arr, []);
  const cb_get__nodes__cond_map = useCallback(fn_get__nodes__cond_map, []);

  const cb_handle__side_update__at_not_loaded_nodes = useCallback(() => {
    if (s__exp_r_nodes__arr.length === 0) return;

    const r_node_uids__arr = s__exp_r_nodes__arr.reduce((arr: string[], r_node) => [...arr, r_node.uid], []);

    cb_get__nodes_of_roots__arr(r_node_uids__arr)
      .then((nodes_of_roots__arr) => {
        dispatch(set_s__exp_nodes__arr(nodes_of_roots__arr));
        dispatch(set_s__exp_nodes__is_loaded(true));
      })
      .catch((err) => {
        fn_handle__error(err, {
          loc: "ExpMap.side.update.at_not_loaded_nodes",
        });
      });
  }, [s__exp_r_nodes__arr, dispatch, cb_get__nodes_of_roots__arr]);

  const cb_handle__side_update__at_loaded_nodes = useCallback(() => {
    const r_node_uids__arr = s__exp_r_nodes__arr.reduce((arr: string[], r_node) => [...arr, r_node.uid], []);

    let trees__arr = fn_get__r_nodes_of_non_children(r_node_uids__arr);
    let nodes__cond_map = fn_get__cond_map_of_uids(r_node_uids__arr);
    let f_nodes__cond_map = fn_get__cond_map_of_uids(r_node_uids__arr);

    const nodes_by_r_node_uid__map = cb_get__nodes_by_r_node_uid__map(s__exp_nodes__arr);

    for (const [r_node_uid, nodes_by_r_node_uid__arr] of Object.entries(nodes_by_r_node_uid__map)) {
      const nodes_by_p_node_uid__map = cb_get__nodes_by_p_node_uid__map(nodes_by_r_node_uid__arr);

      const layered_nodes__arr = cb_get__layered_nodes__arr({
        _cb: cb_get__layered_nodes__arr,
        nodes_by_p_node_uid__map,
        p_node_uid: r_node_uid,
      });

      const r_node__obj = trees__arr.find((r_node) => r_node.uid === r_node_uid);
      if (r_node__obj) {
        r_node__obj.children = layered_nodes__arr;
      }

      nodes__cond_map = {
        ...nodes__cond_map,
        ...cb_get__nodes__cond_map(nodes_by_r_node_uid__arr),
      };

      f_nodes__cond_map = {
        ...f_nodes__cond_map,
        ...cb_get__nodes__cond_map(nodes_by_r_node_uid__arr, FOLDER_TYPE),
      };
    }

    dispatch(set_s__exp_trees__arr(trees__arr));
    dispatch(set_s__exp_nodes__init_cond_map(nodes__cond_map));
    dispatch(set_s__exp_nodes__is_active__cond_map(nodes__cond_map));
    dispatch(set_s__exp_f_nodes__is_fold__cond_map(f_nodes__cond_map));
  }, [
    s__exp_r_nodes__arr,
    s__exp_nodes__arr,
    dispatch,
    cb_get__nodes_by_r_node_uid__map,
    cb_get__nodes_by_p_node_uid__map,
    cb_get__layered_nodes__arr,
    cb_get__nodes__cond_map,
  ]);

  useEffect(() => {
    if (param__user_id) {
      dispatch(
        set_s__exp_r_nodes__arr([
          {
            uid: param__user_id,
            type: ROOT_TYPE,
          },
        ])
      );
      dispatch(set_s__exp_nodes__is_loaded(false));
    }
  }, [dispatch, param__user_id]);

  useEffect(() => {
    if (!s__exp_nodes__is_loaded) {
      cb_handle__side_update__at_not_loaded_nodes();
    }
  }, [s__exp_nodes__is_loaded, cb_handle__side_update__at_not_loaded_nodes]);

  useEffect(() => {
    if (s__exp_nodes__is_loaded) {
      cb_handle__side_update__at_loaded_nodes();
    }
  }, [s__exp_nodes__is_loaded, cb_handle__side_update__at_loaded_nodes]);

  return (
    <Map cssModule={styles} className={styles.exp}>
      <Region cssModule={styles} className={styles.top}>
        <Title cssModule={styles} prop__title={"Explorer"} />
        <MenuBar />
      </Region>

      <Region cssModule={styles} className={`${styles.bottom}`}>
        {s__exp_trees__arr.length > 0 ? (
          <TreeBar />
        ) : s__exp_r_nodes__arr.length === 0 ? (
          <Messages
            cssModule={styles}
            className={styles.no_item}
            prop__messages={messages__no_item__arr}
            onClick={() => {
              dispatch(set_s__exp_menu_item__open_modal());
            }}
          />
        ) : (
          <Loader cssModule={styles} className={styles.spinner} />
        )}
      </Region>

      <Modal
        prop__getter__is_actived={s__exp_menus__is_click__cond_map[menu_items__arr[0].id]}
        prop__setter__close_modal={() => dispatch(set_s__exp_menu_item__close_modal())}
      >
        <ExpRootBar />
      </Modal>
    </Map>
  );
}
