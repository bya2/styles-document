import styles from "@styles-components/common/Activity.module.scss";
import { useState, useMemo } from "react";
import { useAppSelector } from "@store/hooks";

import UList from "@/components/reusable/elements/UList";
import Content from "@/components/reusable/unit1/Content";
import Modal from "@components/reusable/Modal";
import SignContainer from "@/components/common/auth/SignContainer";

import { status_items__at_sign_out__arr, status_items__at_sign_in__arr } from "./items";
import { fn_get__init_s__bool_map } from "@/logic/common";

import type { map, item } from "@/models/reusables";
import type { Handler } from "@/models/Function";

const init_s__cond__obj = fn_get__init_s__bool_map([...status_items__at_sign_out__arr, ...status_items__at_sign_in__arr]);

export default function StatusBar(): JSX.Element {
  // State
  // -- G
  const s__auth__ref = useAppSelector((state) => state.auth.ref);

  // -- L
  const [s__is_click_item__map, set_s__is_click_item__map] = useState<map<boolean>>(init_s__cond__obj);

  // Cache
  const m__is_login_in = useMemo(() => s__auth__ref?.id !== null && s__auth__ref?.hashed !== null, [s__auth__ref]);

  // Handler
  const fn_handle__close__modal = () => {
    set_s__is_click_item__map(init_s__cond__obj);
  };

  const fn_handle__click__status_item: Handler<React.MouseEvent> = (e) => {
    e.stopPropagation();

    const e_tg__curr = e.currentTarget;
    const e_tg__key = e_tg__curr.getAttribute("data-key");

    if (!e_tg__key) return;

    set_s__is_click_item__map({
      ...s__is_click_item__map,
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
                <li key={id} data-key={id} className={styles.group} onClick={(e) => fn_handle__click__status_item(e)}>
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
                  className={`${styles.group} ${s__is_click_item__map[id] ? styles.s__active : ""}`}
                  onClick={(e) => fn_handle__click__status_item(e)}
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
            prop__getter__is_actived={s__is_click_item__map[id]}
            prop__setter__close_modal={() => fn_handle__close__modal()}
          >
            <SignContainer
              prop__mode={content}
              prop__items={items}
              prop__api={api}
              prop__setter__close_modal={fn_handle__close__modal}
            />
          </Modal>
        );
      })}
    </div>
  );
}
