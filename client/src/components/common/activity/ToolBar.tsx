import styles from "@styles-components/Activity.module.scss";
import { useCallback, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { set_s__act_tool__is_active } from "@/store/common/activity";
import UList from "@/components/reusable/bar/UList";
import Item from "@/components/reusable/group/Item";
import Img from "@/components/reusable/box/Image";
import Content from "@/components/reusable/box/Content";
import { tool_items__arr } from "./items";
import type { I_obj } from "@/models/reusables";
import type { T_Handler } from "@/models/function";

export default function ToolBar(): JSX.Element {
  // STATE
  const s__auth__ref = useAppSelector((s) => s.auth.ref);
  const s__is_active_item__map = useAppSelector((s) => s.activity.tools.is_active__cond_map);
  const dispatch = useAppDispatch();

  const m__is_login = useMemo<boolean>(() => s__auth__ref.id !== null && s__auth__ref.hashed !== null, [s__auth__ref]);

  // HANDLER
  const cb_handle__click__tool_item: T_Handler<React.MouseEvent> = useCallback(
    (e) => {
      e.stopPropagation();

      const curr_tg = e.currentTarget;
      const curr_tg_id = curr_tg.getAttribute("data-id");
      if (!curr_tg_id) return;

      dispatch(set_s__act_tool__is_active({ id: curr_tg_id, cond: true }));
    },
    [dispatch]
  );

  // TEMPLATE
  return (
    <UList cssModule={styles} className={styles.tool}>
      {tool_items__arr.map((tool_item__obj: I_obj) => {
        const { id, content, SVG } = tool_item__obj;
        const element = SVG ? <SVG /> : undefined;

        if (id === "bookmark" && !m__is_login) {
          return <></>;
        }

        return (
          <Item
            key={id}
            prop__id={id}
            cssModule={styles}
            className={`${styles.tool} ${s__is_active_item__map[id] ? styles.s__active : ""}`}
            onClick={(e) => cb_handle__click__tool_item(e)}
          >
            <Content cssModule={styles} prop__content={content} prop__is_tooltip={true} />
            <Img cssModule={styles} prop__element={element} />
          </Item>
        );
      })}
    </UList>
  );
}
