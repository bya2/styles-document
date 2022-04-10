import styles from "@styles-components/common/Activity.module.scss";

import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { set_s__tool__is_active_item__map } from "@/store/common/activity";

import UList from "@/components/reusable/elements/UList";
import Content from "@/components/reusable/unit1/Content";
import { activity_tool_items__arr } from "@/assets/items";

import type { item } from "@/models/reusables";
import type { Handler } from "@/models/Function";

export default function ToolBar(): JSX.Element {
  // State
  // -- G
  const s__is_active_item__map = useAppSelector((s) => s.activity.tools.is_active_item__map);
  const dispatch = useAppDispatch();

  // Handler
  const cb_handle__click__tool_item: Handler<React.MouseEvent> = useCallback(
    (e) => {
      e.stopPropagation();

      const e_tg__curr = e.currentTarget;
      const e_tg__key = e_tg__curr.getAttribute("data-key");

      if (!e_tg__key) return;

      dispatch(
        set_s__tool__is_active_item__map({
          ...s__is_active_item__map,
          [e_tg__key]: true,
        })
      );
    },
    [dispatch, s__is_active_item__map]
  );

  return (
    <div className={styles.area__tool_bar}>
      <UList className={styles.bar}>
        {activity_tool_items__arr.map((tool_item__obj: item) => {
          const { id, content, Icon } = tool_item__obj;
          return (
            <li
              key={id}
              data-key={id}
              className={`${styles.group} ${s__is_active_item__map[id] ? styles.s__active : ""}`}
              onClick={(e) => cb_handle__click__tool_item(e)}
            >
              <Icon className={styles.box__icon} />
              <Content className={styles.box__content} prop__content={content} prop__is_tooltip={true} />
            </li>
          );
        })}
      </UList>
    </div>
  );
}
