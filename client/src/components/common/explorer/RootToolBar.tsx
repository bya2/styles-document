import styles from "@styles-components/Explorer.module.scss";
import { useEffect, useCallback, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { set_s__exp_tool__is_click } from "@/store/common/explorer";
import UList from "@/components/reusable/bar/UList";
import Item from "@/components/reusable/group/Item";
import Img from "@/components/reusable/box/Image";
import Tooltip from "@/components/reusable/complete/Tooltip";
import { tool_items__arr } from "@/components/common/explorer/items";
import { fn_get__init_s__bool_map } from "@/logic/reusable";
import type { I_obj, I_cond_map } from "@/models/reusables";

const init_s__is_mouse_enter_item__map = fn_get__init_s__bool_map(tool_items__arr);

export default function ToolBar(): JSX.Element {
  // State
  const s__is_click_item__map = useAppSelector((s) => s.explorer.tools.is_click__cond_map);
  const dispatch = useAppDispatch();

  const [s__is_mouse_enter_item__map, set_s__is_mouse_enter_item__map] = useState<I_cond_map>(init_s__is_mouse_enter_item__map);
  const [s__mouse_pointer_pos, set_s__mouse_pointer_pos] = useState<[number, number]>([0, 0]);

  // Handler
  const cb_handle__click__item = useCallback(
    (e: React.MouseEvent) => {
      const curr_tg = e.currentTarget;
      const curr_tg_id = curr_tg.getAttribute("data-id");

      if (!curr_tg_id) throw Error("No data-id.");

      switch (curr_tg_id) {
        case tool_items__arr[0].id:
          break;
        case tool_items__arr[1].id:
          break;
        case tool_items__arr[2].id:
          break;
        case tool_items__arr[3].id:
          break;
      }

      dispatch(set_s__exp_tool__is_click({ uid: curr_tg_id, cond: true }));
    },
    [dispatch]
  );

  const cb_handle__mouse_enter__item = useCallback(
    (e: React.MouseEvent) => {
      if (Object.values(s__is_mouse_enter_item__map).includes(true)) return;

      const e_tg__curr = e.currentTarget;
      const e_tg__key = e_tg__curr.getAttribute("data-id");

      if (!e_tg__key) return;

      let is_entered: boolean = true;

      e_tg__curr.addEventListener(
        "mouseleave",
        () => {
          is_entered = false;
          set_s__is_mouse_enter_item__map(init_s__is_mouse_enter_item__map);
        },
        {
          once: true,
        }
      );

      setTimeout(() => {
        if (is_entered) {
          set_s__is_mouse_enter_item__map({
            ...s__is_mouse_enter_item__map,
            [e_tg__key]: true,
          });
        }
      }, 1000);

      const e_cX = e.clientX;
      const e_cY = e.clientY;

      set_s__mouse_pointer_pos([e_cX, e_cY]);
    },
    [s__is_mouse_enter_item__map]
  );

  // Mount & Update
  useEffect(() => {
    console.log(s__is_click_item__map);
  }, [s__is_click_item__map]);

  return (
    <UList cssModule={styles} className={styles.tool}>
      {tool_items__arr.map((item__obj: I_obj) => {
        const { id, content, SVG } = item__obj;
        const element = SVG ? <SVG /> : undefined;
        return (
          <Item
            key={id}
            prop__id={id}
            cssModule={styles}
            className={styles.tool}
            onFocus={(e) => e.stopPropagation()}
            onMouseDown={(e) => e.stopPropagation()}
            onClick={(e) => {
              e.stopPropagation();
              cb_handle__click__item(e);
            }}
            onMouseEnter={(e) => {
              e.stopPropagation();
              cb_handle__mouse_enter__item(e);
            }}
          >
            <Img cssModule={styles} prop__element={element} />
            <Tooltip
              prop__content={content}
              prop__mouse_pointer_pos={s__mouse_pointer_pos}
              prop__is_show={s__is_mouse_enter_item__map[id]}
            />
          </Item>
        );
      })}
    </UList>
  );
}
