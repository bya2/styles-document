import styles from "@styles-components/Activity.module.scss";
import { useState, useMemo } from "react";
import { useAppSelector } from "@store/hooks";
import UList from "@/components/reusable/bar/UList";
import Item from "@/components/reusable/group/Item";
import Img from "@/components/reusable/box/Image";
import Content from "@/components/reusable/box/Content";
import Modal from "@components/reusable/complete/Modal";
import AuthContainer from "@/components/common/auth/SignContainer";
import { status_items__at_sign_out__arr, status_items__at_sign_in__arr } from "./items";
import { fn_get__init_s__bool_map } from "@/logic/reusable";
import type { I_map, I_obj } from "@/models/reusables";
import type { T_Handler } from "@/models/function";

const init_s__cond__obj = fn_get__init_s__bool_map([...status_items__at_sign_out__arr, ...status_items__at_sign_in__arr]);

export default function StatusBar(): JSX.Element {
  // State
  // -- G
  const s__auth__ref = useAppSelector((state) => state.auth.ref);

  // -- L
  const [s__is_click_item__map, set_s__is_click_item__map] = useState<I_map<boolean>>(init_s__cond__obj);

  // Cache
  const m__is_login_in = useMemo(() => s__auth__ref?.id !== null && s__auth__ref?.hashed !== null, [s__auth__ref]);

  // Handler
  const fn_handle__close__modal = () => {
    set_s__is_click_item__map(init_s__cond__obj);
  };

  const fn_handle__click__status_item: T_Handler<React.MouseEvent> = (e) => {
    e.stopPropagation();

    const e_tg__curr = e.currentTarget;
    const e_tg__key = e_tg__curr.getAttribute("data-id");

    if (!e_tg__key) return;

    set_s__is_click_item__map({
      ...s__is_click_item__map,
      [e_tg__key]: true,
    });
  };

  return (
    <div className={styles.area__status_bar}>
      <UList cssModule={styles}>
        {m__is_login_in
          ? status_items__at_sign_in__arr.map((item__obj: I_obj) => {
              const { id, content, SVG } = item__obj;
              const element = SVG ? <SVG /> : undefined;
              return (
                <Item key={id} prop__id={id} cssModule={styles} onClick={(e) => fn_handle__click__status_item(e)}>
                  <Img cssModule={styles} prop__element={element} />
                  <Content cssModule={styles} prop__content={content} prop__is_tooltip={true} />
                </Item>
              );
            })
          : status_items__at_sign_out__arr.map((item__obj: I_obj) => {
              const { id, content, SVG } = item__obj;
              const element = SVG ? <SVG /> : undefined;
              return (
                <Item
                  key={id}
                  prop__id={id}
                  cssModule={styles}
                  className={s__is_click_item__map[id] ? styles.s__active : ""}
                  onClick={(e) => fn_handle__click__status_item(e)}
                >
                  <Img cssModule={styles} prop__element={element} />
                  <Content cssModule={styles} prop__content={content} prop__is_tooltip={true} />
                </Item>
              );
            })}
      </UList>

      {/* {status_items__at_sign_out__arr.map((item__obj: I_obj) => {
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
      })} */}
    </div>
  );
}
