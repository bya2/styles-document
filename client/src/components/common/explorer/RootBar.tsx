import styles from "@styles-components/Explorer.module.scss";
import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { set_s__exp_menu_item__close_modal, set_s__exp_roots__arr } from "@/store/common/explorer";
import Area from "@/components/reusable/area/Area";
import Title from "@/components/reusable/box/Title";
import UList from "@/components/reusable/bar/UList";
import Item from "@/components/reusable/group/Item";
import Content from "@/components/reusable/box/Content";
import Img from "@/components/reusable/box/Image";
import OpenIcon from "@/assets/icon/activity/open-outline.svg";
import type { T_Handler } from "@/models/function";

export default function RootBar() {
  // State
  const s__act_roots__arr = useAppSelector((s) => s.activity.roots.arr);
  const s__exp_roots__arr = useAppSelector((s) => s.explorer.roots.arr);
  const dispatch = useAppDispatch();

  const cb_handle__click__item: T_Handler<React.MouseEvent> = useCallback(
    (e) => {
      const e_tg__curr = e.currentTarget;
      const e_tg__id = e_tg__curr.getAttribute("data-id");
      if (!e_tg__id) return;

      const is_duplicated = s__exp_roots__arr.find((el) => el?.id === e_tg__id);
      if (is_duplicated) return;

      dispatch(set_s__exp_roots__arr([...s__exp_roots__arr, { id: e_tg__id }]));
      dispatch(set_s__exp_menu_item__close_modal());
    },
    [dispatch, s__exp_roots__arr]
  );

  return (
    <Area cssModule={styles} className={styles.roots}>
      <Title cssModule={styles} prop__title={"루트를 선택하세요."} />
      <UList cssModule={styles}>
        {s__act_roots__arr.map((act_root__obj) => {
          const { id } = act_root__obj;

          if (s__exp_roots__arr.find((el) => el?.id === act_root__obj.id)) {
            return <li key={id}></li>;
          }

          return (
            <Item key={id} prop__id={id} cssModule={styles} onClick={(e) => cb_handle__click__item(e)}>
              <Content cssModule={styles} prop__content={id} />
              <Img cssModule={styles} prop__element={<OpenIcon />} />
            </Item>
          );
        })}
      </UList>
    </Area>
  );
}
