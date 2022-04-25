import styles from "@styles-components/Explorer.module.scss";
import React, { useState, useEffect, useCallback } from "react";
// import { useParams, useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "@store/hooks";
import {
  set_s__exp__init_mount,
  set_s__exp_roots__arr,
  set_s__exp_nodes__is_active_node__map,
  set_s__exp_f_nodes__is_fold_node__map,
  set_s__exp_trees__arr,
  set_s__exp_menu_item__open_modal,
  set_s__exp_menu_item__close_modal,
  set_init_s__exp_nodes__cond__map,
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
import { ROOT_NODE_ID, NODE_TYPE__FOLDER } from "@/config/common";
import { fn_get__init_s__bool_map } from "@/logic/reusable";
import {
  fn_get__exp_nodes__n_arr,
  fn_get__exp_nodes_by_pnode_id__map,
  fn_get__layered_exp_nodes__arr,
  fn_get__exp_nodes__cond_map,
} from "@/logic/explorer";
import type { T_Handler } from "@/models/function";
import type { I_map } from "@/models/reusables";
import type { expRoot, expNode, expTree } from "@/models/explorer";

const init_s__is_click__map: I_map<boolean> = fn_get__init_s__bool_map([...layout_menu_items__arr]);

export default function Explorer(): JSX.Element {
  // State
  const s__act_roots = useAppSelector((s) => s.activity.roots);
  const s__act_roots__is_mouse_down_root__map = s__act_roots.is_mouse_down_root__map;

  const s__explorer = useAppSelector((state) => state.explorer);
  const s__exp__is_init_mount = s__explorer.is_mounted;
  const s__exp_roots__arr = s__explorer.roots.arr;
  const s__exp__init_s__cond_map = s__explorer.nodes.init_s__cond_map;
  const s__exp__is_active_node__map = s__explorer.nodes.is_active_node__map;
  const s__exp__is_fold_f_node__map = s__explorer.nodes.is_fold_f_node__map;
  const s__exp_menus__is_click_item__map = s__explorer.menus.is_click_item__map;
  const s__exp_trees__arr = s__explorer.trees.arr;
  const s__auth = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();

  const [s__is_loding__map, set_s__is_loading__map] = useState<I_map<boolean>>({});
  const [s__is_mouse_enter__map, set_s__is_mouse_enter__map] = useState<I_map<boolean>>({ bar__tree: false });
  const [s__is_click__map, set_s__is_click__map] = useState<I_map<boolean>>(init_s__is_click__map);

  // Handler
  const cb_handle__mouse_enter__exp2_area: T_Handler<React.MouseEvent> = useCallback(
    (e) => {
      const dragged: string | undefined = Object.keys(s__act_roots__is_mouse_down_root__map).find(
        (key) => s__act_roots__is_mouse_down_root__map[key] === true
      );
      console.log("DRAGG:", dragged);
      if (!dragged) return;

      const is_duplicated = s__exp_roots__arr.find((el) => el?.id === dragged);
      console.log("DUPLICATE:", is_duplicated);
      if (is_duplicated) return;

      set_s__is_mouse_enter__map({
        ...s__is_mouse_enter__map,
        bar__tree: true,
      });

      e.currentTarget.addEventListener(
        "mouseleave",
        () => {
          set_s__is_mouse_enter__map({
            ...s__is_mouse_enter__map,
            bar__tree: false,
          });
        },
        { once: true }
      );

      e.currentTarget.addEventListener(
        "mouseup",
        () => {
          const exp_root__obj: expRoot = { id: dragged };

          dispatch(set_s__exp_roots__arr([...s__exp_roots__arr, exp_root__obj]));

          set_s__is_mouse_enter__map({
            ...s__is_mouse_enter__map,
            bar__tree: false,
          });
        },
        { once: true }
      );
    },
    [dispatch, s__act_roots__is_mouse_down_root__map, s__exp_roots__arr, s__is_mouse_enter__map]
  );

  const cb_get__exp_nodes__n_arr = useCallback(fn_get__exp_nodes__n_arr, []);
  const cb_get__get__exp_nodes_by_pnode_id__map = useCallback(fn_get__exp_nodes_by_pnode_id__map, []);
  const cb_get__layered_exp_nodes__arr = useCallback(fn_get__layered_exp_nodes__arr, []);
  const cb_get__exp_nodes__cond_map = useCallback(fn_get__exp_nodes__cond_map, []);

  // Side: Mount
  useEffect(() => {
    if (s__exp__is_init_mount) {
      console.log("alreay init mount.");
      return;
    }

    if (s__exp_roots__arr.length === 0) {
      console.log("no item.");
      return;
    }

    cb_get__exp_nodes__n_arr(s__exp_roots__arr)
      .then((exp_nodes__n_arr: expNode[][]) => {
        let exp_trees__arr: expTree[] = [];
        let exp_nodes__cond_map: I_map<boolean> = {};
        let exp_f_nodes__cond_map: I_map<boolean> = {};

        for (const [exp_root_idx, exp_nodes__arr] of [...exp_nodes__n_arr].entries()) {
          const exp_nodes_by_pnode_id__map = cb_get__get__exp_nodes_by_pnode_id__map(exp_nodes__arr);
          console.log(exp_root_idx, s__exp_roots__arr[exp_root_idx].id);

          const layered_exp_nodes__arr = cb_get__layered_exp_nodes__arr({
            _cb: cb_get__layered_exp_nodes__arr,
            exp_nodes_by_pnode_id__map,
            // pnode_id: s__exp_roots__arr[exp_root_idx].id, // (서버와 연결될 때, -현재 DUMMY 데이터 사용 중-)
          });

          exp_trees__arr = [
            ...exp_trees__arr,
            {
              id: ROOT_NODE_ID,
              children: layered_exp_nodes__arr,
            },
          ];

          // console.log("TREES:", exp_trees__arr);

          exp_nodes__cond_map = {
            ...exp_nodes__cond_map,
            ...cb_get__exp_nodes__cond_map(exp_nodes__arr),
            // [s__exp_roots__arr[exp_root_idx].id]: false,
            [ROOT_NODE_ID]: false,
          };

          exp_f_nodes__cond_map = {
            ...exp_f_nodes__cond_map,
            ...cb_get__exp_nodes__cond_map(exp_nodes__arr, NODE_TYPE__FOLDER),
            // [s__exp_roots__arr[exp_root_idx].id]: false,
            [ROOT_NODE_ID]: false,
          };
        }

        // console.log("CONDMAP:", exp_nodes__cond_map, exp_f_nodes__cond_map);

        dispatch(set_s__exp__init_mount());

        return {
          exp_trees__arr,
          exp_nodes__cond_map,
          exp_f_nodes__cond_map,
        };
      })
      .then((results) => {
        dispatch(set_s__exp_trees__arr(results.exp_trees__arr));

        dispatch(
          set_init_s__exp_nodes__cond__map({
            ...s__exp__init_s__cond_map,
            ...results.exp_nodes__cond_map,
          })
        );

        dispatch(
          set_s__exp_nodes__is_active_node__map({
            ...s__exp__is_active_node__map,
            ...results.exp_nodes__cond_map,
            [ROOT_NODE_ID]: true,
          })
        );

        dispatch(
          set_s__exp_f_nodes__is_fold_node__map({
            ...s__exp__is_fold_f_node__map,
            ...results.exp_f_nodes__cond_map,
            [ROOT_NODE_ID]: true,
          })
        );
      })
      .catch((err) => {
        const ERR_MSG = "@/components/common/explorer/Explorer.tsx (MOUNT)";
        console.error(`${ERR_MSG}\n${err}`);
      });
  }, [
    s__exp_roots__arr,
    cb_get__exp_nodes__n_arr,
    cb_get__get__exp_nodes_by_pnode_id__map,
    cb_get__layered_exp_nodes__arr,
    cb_get__exp_nodes__cond_map,
    dispatch,
    s__exp__is_init_mount,
    s__exp__init_s__cond_map,
    s__exp__is_active_node__map,
    s__exp__is_fold_f_node__map,
    s__exp_trees__arr,
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

      <Region cssModule={styles} className={`${styles.bottom}`} onMouseEnter={(e) => cb_handle__mouse_enter__exp2_area(e)}>
        {s__exp_trees__arr.length > 0 ? (
          <TreeBar />
        ) : s__exp_roots__arr.length === 0 ? (
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
        prop__getter__is_actived={s__exp_menus__is_click_item__map[layout_menu_items__arr[0].id]}
        prop__setter__close_modal={() => dispatch(set_s__exp_menu_item__close_modal())}
      >
        <ExpRootBar />
      </Modal>
    </Map>
  );
}
