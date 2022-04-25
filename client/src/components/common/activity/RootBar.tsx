import styles from "@styles-components/Activity.module.scss";
import { useCallback, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { init_s__act_roots__is_mouse_down_root__map, set_s__act_roots__is_mouse_down_root__map } from "@/store/common/activity";
import OpenIcon from "@/assets/icon/activity/open-outline.svg";
import UList from "@/components/reusable/bar/UList";
import Item from "@/components/reusable/group/Item";
import Img from "@/components/reusable/box/Image";
import Content from "@/components/reusable/box/Content";
import Tooltip from "@/components/reusable/complete/Tooltip";
import type { T_Handler } from "@/models/function";

export default function RootBar() {
  // State
  const s__act_roots__arr = useAppSelector((s) => s.activity.roots.arr);
  const s__exp_roots__arr = useAppSelector((s) => s.explorer.roots.arr);
  const s__is_mouse_down_root__map = useAppSelector((s) => s.activity.roots.is_mouse_down_root__map);
  const dispatch = useAppDispatch();
  const [s__mouse_pointer_pos, set_s__mouse_pointer_pos] = useState<[number, number]>([0, 0]);

  // Handler
  const cb_handle__mouse_down__item: T_Handler<React.MouseEvent> = useCallback(
    (e) => {
      e.stopPropagation();

      const e_tg__curr = e.currentTarget;
      const e_tg__key = e_tg__curr.getAttribute("data-id");

      if (!e_tg__key) return;

      dispatch(
        set_s__act_roots__is_mouse_down_root__map({
          ...s__is_mouse_down_root__map,
          [e_tg__key]: true,
        })
      );

      const fn_handle__mose_move__item: T_Handler<MouseEvent> = (e) => {
        set_s__mouse_pointer_pos([e.clientX, e.clientY]);
      };

      window.addEventListener(
        "mouseup",
        () => {
          dispatch(init_s__act_roots__is_mouse_down_root__map());
          window.removeEventListener("mousemove", fn_handle__mose_move__item);
        },
        { once: true }
      );

      window.addEventListener("mousemove", fn_handle__mose_move__item);
    },
    [dispatch, s__is_mouse_down_root__map]
  );

  return (
    <div className={styles.area__root_bar}>
      <UList cssModule={styles}>
        {s__act_roots__arr.map((act_root__obj) => {
          const { id } = act_root__obj;

          if (s__exp_roots__arr.find((el) => el?.id === act_root__obj.id)) {
            return <li key={id}></li>;
          }

          return (
            <Item key={id} prop__id={id} cssModule={styles} onMouseDown={(e) => cb_handle__mouse_down__item(e)}>
              <Img cssModule={styles} prop__element={<OpenIcon />} />
              <Content cssModule={styles} prop__content={id} prop__is_tooltip={true} />
              <Tooltip
                prop__content={id}
                prop__mouse_pointer_pos={s__mouse_pointer_pos}
                prop__is_show={s__is_mouse_down_root__map[id]}
              />
            </Item>
          );
        })}
      </UList>
    </div>
  );
}
