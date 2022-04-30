import styles from "@styles-components/Explorer.module.scss";
import { useState, useEffect, useCallback, useMemo } from "react";
import { useAppSelector, useAppDispatch } from "@store/hooks";
import {
  set_s__exp__init_mount,
  // set_s__exp_r_nodes,
  set_s__exp_r_nodes__arr,
  set_s__exp_r_nodes__is_active__cond_map,
  set_s__exp_r_node__is_active,
  set_s__exp_nodes__is_active__cond_map,
  set_s__exp_f_nodes__is_fold__cond_map,
  set_s__exp_trees__arr,
  set_s__exp_menu_item__open_modal,
  set_s__exp_menu_item__close_modal,
  set_s__exp_nodes__init_cond_map,
  add_s__exp_r_node__obj,
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
import { layout_menu_items__arr, messages__no_item__arr } from "./items";
import { fn_get__cond_map_of_uids, fn_get__init_s__bool_map, fn_handle__error__ctx } from "@/logic/reusable";
import {
  fn_get__nodes_of_roots__arr,
  fn_get__nodes_by_r_node_uid__map,
  fn_get__nodes_by_p_node_uid__map,
  fn_get__layered_nodes__arr,
  fn_get__nodes__cond_map,
  fn_get__r_node_of_non_children,
} from "@/logic/explorer";
import type { I_cond_map, I_map } from "@/models/reusables";
import type { I_exp_node, I_exp_r_node } from "@/models/explorer";
import { FOLDER_TYPE, ROOT_TYPE } from "@/config/explorer";

const init_s__is_click__map: I_map<boolean> = fn_get__init_s__bool_map([...layout_menu_items__arr]);

export default function Explorer(): JSX.Element {
  // State
  const s__act_roots = useAppSelector((s) => s.activity.r_nodes);
  const s__act_roots__is_mouse_down_root__map = s__act_roots.is_mouse_down__cond_map;

  const s__explorer = useAppSelector((s) => s.explorer);
  const s__exp_nodes__arr = s__explorer.nodes.arr;
  const s__exp_nodes__is_loaded = s__explorer.nodes.is_loaded;
  const s__exp__is_init_mount = s__explorer.is_mounted;
  const s__exp_r_nodes__arr = s__explorer.r_nodes.arr;
  const s__exp_nodes__init_s__cond_map = s__explorer.nodes.init_s__cond_map;
  const s__exp_nodes__is_active__cond_map = s__explorer.nodes.is_active__cond_map;
  const s__exp_f_nodes__is_fold__cond_map = s__explorer.nodes.is_fold__cond_map;
  const s__exp_menus__is_click__cond_map = s__explorer.menus.is_click__cond_map;
  const s__exp_trees__arr = s__explorer.trees.arr;
  // const s__auth = useAppSelector((s) => s.auth);
  const dispatch = useAppDispatch();

  const [s__is_mouse_enter__map, set_s__is_mouse_enter__map] = useState<I_map<boolean>>({ bar__tree: false });
  const [s__is_click__map, set_s__is_click__map] = useState<I_map<boolean>>(init_s__is_click__map);

  // Handler
  // const cb_handle__mouse_enter__exp2_area: T_Handler<React.MouseEvent> = useCallback(
  //   (e) => {
  //     const dragged: string | undefined = Object.keys(s__act_roots__is_mouse_down_root__map).find(
  //       (key) => s__act_roots__is_mouse_down_root__map[key] === true
  //     );
  //     console.log("DRAGG:", dragged);
  //     if (!dragged) return;

  //     const is_duplicated = s__exp_r_nodes__arr.find((el) => el?.uid === dragged);
  //     console.log("DUPLICATE:", is_duplicated);
  //     if (is_duplicated) return;

  //     set_s__is_mouse_enter__map({
  //       ...s__is_mouse_enter__map,
  //       bar__tree: true,
  //     });

  //     e.currentTarget.addEventListener(
  //       "mouseleave",
  //       () => {
  //         set_s__is_mouse_enter__map({
  //           ...s__is_mouse_enter__map,
  //           bar__tree: false,
  //         });
  //       },
  //       { once: true }
  //     );

  //     e.currentTarget.addEventListener(
  //       "mouseup",
  //       () => {
  //         const exp_root__obj: I_exp_r_node = { uid: dragged, type:  };

  //         dispatch(add_s__exp_r_node__obj(exp_root__obj);

  //         set_s__is_mouse_enter__map({
  //           ...s__is_mouse_enter__map,
  //           bar__tree: false,
  //         });
  //       },
  //       { once: true }
  //     );
  //   },
  //   [dispatch, s__act_roots__is_mouse_down_root__map, s__exp_r_nodes__arr, s__is_mouse_enter__map]
  // );

  const cb_get__nodes_of_roots__arr = useCallback(fn_get__nodes_of_roots__arr, []);
  const cb_get__nodes_by_r_node_uid__map = useCallback(fn_get__nodes_by_r_node_uid__map, []);
  const cb_get__nodes_by_p_node_uid__map = useCallback(fn_get__nodes_by_p_node_uid__map, []);
  const cb_get__layered_nodes__arr = useCallback(fn_get__layered_nodes__arr, []);
  const cb_get__nodes__cond_map = useCallback(fn_get__nodes__cond_map, []);

  // SIDE - Update, Non-Loaded
  useEffect(() => {
    if (s__exp_nodes__is_loaded) return;
    if (s__exp_r_nodes__arr.length === 0) return;

    const r_node_uids__arr = s__exp_r_nodes__arr.reduce((arr: string[], r_node) => [...arr, r_node.uid], []);

    cb_get__nodes_of_roots__arr(r_node_uids__arr)
      .then((nodes__arr: I_exp_node[]) => {
        dispatch(set_s__exp_nodes__arr(nodes__arr));
        dispatch(set_s__exp_nodes__is_loaded(true));
      })
      .catch((err) => fn_handle__error__ctx(err, "LOC: ExpMap"));
  }, [s__exp_nodes__is_loaded, s__exp_r_nodes__arr, dispatch, cb_get__nodes_of_roots__arr]);

  // SIDE - Update, Loaded
  useEffect(() => {
    if (!s__exp_nodes__is_loaded) return;

    console.log("fdsa", s__exp_nodes__arr);

    const r_node_uids__arr = s__exp_r_nodes__arr.reduce((arr: string[], r_node) => [...arr, r_node.uid], []);

    let trees__arr = fn_get__r_node_of_non_children(r_node_uids__arr);
    let nodes__cond_map = fn_get__cond_map_of_uids(r_node_uids__arr);
    let f_nodes__cond_map = fn_get__cond_map_of_uids(r_node_uids__arr);

    const nodes_by_r_node_uid__map = cb_get__nodes_by_r_node_uid__map(s__exp_nodes__arr);

    let r_node_idx = 0;
    for (const [r_node_uid, nodes_by_r_node_uid__arr] of Object.entries(nodes_by_r_node_uid__map)) {
      const nodes_by_p_node_uid__map = cb_get__nodes_by_p_node_uid__map(nodes_by_r_node_uid__arr);

      console.log("mmmm", nodes_by_p_node_uid__map);

      const layered_nodes__arr = cb_get__layered_nodes__arr({
        _cb: cb_get__layered_nodes__arr,
        nodes_by_p_node_uid__map,
        p_node_uid: r_node_uid,
      });

      trees__arr[r_node_idx].children = layered_nodes__arr;

      nodes__cond_map = {
        ...nodes__cond_map,
        ...cb_get__nodes__cond_map(nodes_by_r_node_uid__arr),
      };

      f_nodes__cond_map = {
        ...f_nodes__cond_map,
        ...cb_get__nodes__cond_map(nodes_by_r_node_uid__arr, FOLDER_TYPE),
      };

      r_node_idx++;
    }

    dispatch(set_s__exp_trees__arr(trees__arr));
    dispatch(set_s__exp_nodes__init_cond_map(nodes__cond_map));
    dispatch(set_s__exp_nodes__is_active__cond_map(nodes__cond_map));
    dispatch(set_s__exp_f_nodes__is_fold__cond_map(f_nodes__cond_map));
  }, [
    s__exp_nodes__is_loaded,
    s__exp_r_nodes__arr,
    s__exp_nodes__arr,
    dispatch,
    cb_get__nodes_by_r_node_uid__map,
    cb_get__nodes_by_p_node_uid__map,
    cb_get__layered_nodes__arr,
    cb_get__nodes__cond_map,
  ]);

  // Side: Update
  useEffect(() => {
    if (s__is_click__map[layout_menu_items__arr[0].id]) {
      // Exp2 분할 및 루트 추가
    }

    if (s__is_click__map[layout_menu_items__arr[1].id]) {
      // Exp 확장
    }

    // set_s__is_click__map(init_s__is_click__map);
  }, [s__is_click__map]);

  return (
    <Map cssModule={styles} className={styles.exp}>
      <Region cssModule={styles} className={styles.top}>
        <Title cssModule={styles} prop__title={"Explorer"} />
        <MenuBar />
      </Region>

      <Region cssModule={styles} className={`${styles.bottom}`} /*onMouseEnter={(e) => cb_handle__mouse_enter__exp2_area(e)} */>
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
          <TreeBar />
          // <Loader cssModule={styles} className={styles.spinner} />
        )}
      </Region>

      <Modal
        prop__getter__is_actived={s__exp_menus__is_click__cond_map[layout_menu_items__arr[0].id]}
        prop__setter__close_modal={() => dispatch(set_s__exp_menu_item__close_modal())}
      >
        <ExpRootBar />
      </Modal>
    </Map>
  );
}
