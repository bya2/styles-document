import styles from "@styles-components/common/Activity.module.scss";
import React, { useState, useMemo, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "@store/hooks";

import Tooltip from "@components/reusable/Tooltip";
import UList from "@/components/reusable/elements/UList";
import Modal from "@components/reusable/Modal";
import SignContainer from "@/components/common/auth/SignContainer";

import { status_items__at_sign_out__arr, status_items__at_sign_in__arr } from "./items";
import { fn_get__init_s__bool_map } from "@/logic/common";

import type { cond, item } from "@/models/reusables";
import Content from "@/components/reusable/unit1/Content";

const init_s__cond__obj = fn_get__init_s__bool_map([...status_items__at_sign_out__arr, ...status_items__at_sign_in__arr]);

export default function StatusBar(): JSX.Element {
  // State
  // -- G
  const s__auth__ref = useAppSelector((state) => state.auth.ref);
  const dispatch = useAppDispatch();

  // -- L
  const [s__is_click_item__cmap, set_s__is_click_item__cmap] = useState<cond>(init_s__cond__obj);

  // Cache
  const m__is_login_in = useMemo(() => s__auth__ref?.id !== null && s__auth__ref?.hashed !== null, [s__auth__ref]);

  // Setter
  const fn_set__close_modal__item = () => {
    set_s__is_click_item__cmap(init_s__cond__obj);
  };

  // Side
  useEffect(() => {
    console.log(s__is_click_item__cmap);
  }, [s__is_click_item__cmap]);

  // Event
  const fn_handle__click__menu_item = (e: React.MouseEvent) => {
    e.stopPropagation();

    const e_tg__curr = e.currentTarget as HTMLElement;
    const e_tg__key = e_tg__curr.getAttribute("data-key") as string;

    set_s__is_click_item__cmap({
      ...s__is_click_item__cmap,
      [e_tg__key]: true,
    });
  };

  return (
    <div className={styles.area__status_bar}>
      <UList className={styles.bar}>
        {m__is_login_in
          ? status_items__at_sign_in__arr.map((item__obj: item) => {
              const { id, content, Icon } = item__obj;
              return (
                <li key={id} data-key={id} className={styles.group} onClick={(e) => fn_handle__click__menu_item(e)}>
                  <Icon className={styles.box__icon} />
                  <Content className={styles.box__content} prop__content={content} prop__is_tooltip={true} />
                </li>
              );
            })
          : status_items__at_sign_out__arr.map((item__obj: item) => {
              const { id, content, Icon } = item__obj;
              return (
                <li
                  key={id}
                  data-key={id}
                  className={`${styles.group} ${s__is_click_item__cmap[id] ? styles.s__active : ""}`}
                  onClick={(e) => fn_handle__click__menu_item(e)}
                >
                  <Icon className={styles.box__icon} />
                  <Content className={styles.box__content} prop__content={content} prop__is_tooltip={true} />
                </li>
              );
            })}
      </UList>

      {status_items__at_sign_out__arr.map((item__obj: item) => {
        const { id, content, items, api } = item__obj;

        return (
          <Modal
            key={id}
            prop__getter__is_actived={s__is_click_item__cmap[id]}
            prop__setter__close_modal={() => fn_set__close_modal__item()}
          >
            <SignContainer
              prop__mode={content}
              prop__items={items}
              prop__api={api}
              prop__setter__close_modal={fn_set__close_modal__item}
            />
          </Modal>
        );
      })}
    </div>
  );
}
