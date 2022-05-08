import styles from "@styles-components/Activity.module.scss";
import { useCallback, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { init_s__act_r_nodes__is_mouse_down__cond_map, set_s__act_r_node__is_mouse_down } from "@/store/common/activity";
import OpenIcon from "@/assets/icon/activity/open-outline.svg";
import UList from "@/components/reusable/bar/UList";
import Item from "@/components/reusable/group/Item";
import Img from "@/components/reusable/box/Image";
import Content from "@/components/reusable/box/Content";
import Tooltip from "@/components/reusable/complete/Tooltip";

export default function RootBar() {
  // State
  const s__act_r_nodes__arr = useAppSelector((s) => s.activity.r_nodes.arr);
  const s__act_r_nodes__is_mouse_down__cond_map = useAppSelector((s) => s.activity.r_nodes.is_mouse_down__cond_map);
  const s__exp_r_nodes__arr = useAppSelector((s) => s.explorer.r_nodes.arr);
  const dispatch = useAppDispatch();
  const [s__mouse_pointer_pos, set_s__mouse_pointer_pos] = useState<[number, number]>([0, 0]);

  // Handler
  const cb_handle__mouse_down__item = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();

      const curr_tg = e.currentTarget;
      const curr_tg_id = curr_tg.getAttribute("data-id");
      if (!curr_tg_id) return;

      dispatch(set_s__act_r_node__is_mouse_down({ id: curr_tg_id, cond: true }));

      const fn_handle__mouse_move__item = (e: MouseEvent) => {
        set_s__mouse_pointer_pos([e.clientX, e.clientY]);
      };

      window.addEventListener(
        "mouseup",
        () => {
          dispatch(init_s__act_r_nodes__is_mouse_down__cond_map());
          window.removeEventListener("mousemove", fn_handle__mouse_move__item);
        },
        { once: true }
      );

      window.addEventListener("mousemove", fn_handle__mouse_move__item);
    },
    [dispatch]
  );

  return (
    <div className={styles.area__root_bar}>
      <UList cssModule={styles}>
        {s__act_r_nodes__arr.map((act_r_node) => {
          const { id } = act_r_node;

          if (s__exp_r_nodes__arr.find((exp_r_node) => exp_r_node.uid === act_r_node.id)) {
            return <li key={id}></li>;
          }

          return (
            <Item key={id} prop__id={id} cssModule={styles} onMouseDown={(e) => cb_handle__mouse_down__item(e)}>
              <Img cssModule={styles} prop__element={<OpenIcon />} />
              <Content cssModule={styles} prop__content={id} prop__is_tooltip={true} />
              <Tooltip
                prop__content={id}
                prop__mouse_pointer_pos={s__mouse_pointer_pos}
                prop__is_show={s__act_r_nodes__is_mouse_down__cond_map[id]}
              />
            </Item>
          );
        })}
      </UList>
    </div>
  );
}
