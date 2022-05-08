import styles from "@styles-components/Explorer.module.scss";
import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "@store/hooks";
import UList from "@/components/reusable/bar/UList";
import Content from "@/components/reusable/box/Content";
import Img from "@/components/reusable/box/Image";
import Item from "@/components/reusable/group/Item";
import { menu_items__arr } from "./items";
import { set_s__exp_menu__is_click, toggle_s__exp_menu__is_click } from "@/store/common/explorer";
import { fn_PATCH__auth__add_bookmark, fn_PATCH__auth__remove_bookmark } from "@/api/auth";
import { add_s__bm__item__str, del_s__bm__item__str } from "@/store/common/bookmark";

export default function MenuBar() {
  // Param
  const { userId: param__user_id } = useParams();

  // State
  const s__auth__ref = useAppSelector((s) => s.auth.ref);
  const s__auth__ref_id = s__auth__ref.id;
  const s__bm__items__arr = useAppSelector((s) => s.bookmark.items);
  const dispatch = useAppDispatch();

  // Memo
  const m__is_login = useMemo(() => s__auth__ref.id !== null || s__auth__ref.hashed !== null, [s__auth__ref]);

  // Handler
  const fn_handle__click__extension = (e: React.MouseEvent<HTMLLIElement>) => {
    const e_tg_id = e.currentTarget.dataset.id;
    if (!e_tg_id) throw new Error("no dataset id");
    dispatch(set_s__exp_menu__is_click({ uid: e_tg_id, cond: true }));
  };

  const fn_handle__click__bookmark = (e: React.MouseEvent<HTMLLIElement>) => {
    if (!param__user_id || !s__auth__ref_id) {
      let msg: string[] | string = [];
      if (!param__user_id) msg = [...msg, "param__user_id"];
      if (!s__auth__ref_id) msg = [...msg, "s__auth__ref_id"];
      throw new Error(`no ${msg.join(",")}`);
    }

    const e_tg__key = e.currentTarget.getAttribute("data-id");
    if (!e_tg__key) return;

    if (!s__bm__items__arr.find((item) => item === param__user_id)) {
      fn_PATCH__auth__add_bookmark({ id: s__auth__ref_id, bookmark: param__user_id });
      dispatch(add_s__bm__item__str(param__user_id));
    } else {
      fn_PATCH__auth__remove_bookmark({ id: s__auth__ref_id, bookmark: param__user_id });
      dispatch(del_s__bm__item__str(param__user_id));
    }

    dispatch(toggle_s__exp_menu__is_click({ uid: e_tg__key }));
  };

  return (
    <UList cssModule={styles} className={styles.menu}>
      {menu_items__arr.map((item__obj) => {
        const { id, content, SVG } = item__obj;
        const element = SVG ? <SVG /> : undefined;

        if (id === "bookmark" && !m__is_login) {
          return <></>;
        }

        return (
          <Item
            key={id}
            prop__id={id}
            cssModule={styles}
            className={`${styles.menu} ${
              id === "bookmark" && s__bm__items__arr.find((item) => item === param__user_id) ? styles.s__active : undefined
            }`}
            onClick={(e) => {
              if (id === "extension") fn_handle__click__extension(e);
              if (id === "bookmark") fn_handle__click__bookmark(e);
            }}
          >
            <Img cssModule={styles} prop__element={element} />
            <Content cssModule={styles} prop__content={content} prop__is_tooltip={true} />
          </Item>
        );
      })}
    </UList>
  );
}
