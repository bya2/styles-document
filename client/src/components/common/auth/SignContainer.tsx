import styles from "@styles-components/Auth.module.scss";

import { useState } from "react";
import { useAppDispatch } from "@/store/hooks";

import Container from "@/components/reusable/area/Container";
import UList from "@components/reusable/bar/UList";
import Field from "@/components/reusable/bar/Field";
import Input from "@components/reusable/elements/Input";
import { fn_get__init_str_map } from "@/logic/reusable";
import { fn_GET__auth__sign_in, fn_POST__auth__sign_up } from "@/api/auth";
import type { I_obj } from "@/models/reusables";
import type { T_Handler } from "@/models/function";
import Item from "@/components/reusable/group/Item";
import type { I_auth__sign_in_account, I_auth__sign_up_account, I_auth__sign_in_ref } from "@/models/auth";
import { fn_handle__error__ctx } from "@/logic/reusable";
import { set_s__auth_ref } from "@/store/common/auth";
import { fn_wrap__fb_GET, fn_wrap__fb_POST } from "@/logic/api";
import { local_storage_keys__map, session_storage_keys__map } from "@/config/storage";
import BtnBox from "@components/reusable/box/Button";

interface I_props {
  prop__mode: string;
  prop__items: I_obj[];
  prop__setter__close_modal: () => void;
}

export default function AuthContainer({ prop__mode, prop__items, prop__setter__close_modal }: I_props) {
  // State
  const dispatch = useAppDispatch();
  const [s__form_infos__obj, set_s__form_infos__obj] = useState(fn_get__init_str_map(prop__items));

  // Event
  const fn_handle__submit__form: T_Handler<React.FormEvent> = (e) => {
    e.preventDefault();
    e.stopPropagation();

    let fn_API__auth__promise;

    switch (prop__mode) {
      case "sign_in":
        fn_API__auth__promise = fn_wrap__fb_GET<I_auth__sign_in_account, I_auth__sign_in_ref>(
          fn_GET__auth__sign_in,
          s__form_infos__obj as I_auth__sign_in_account
        ).then((_obj) => {
          if (!_obj) return false;

          dispatch(
            set_s__auth_ref({
              id: _obj.id,
              hashed: _obj.hashed,
            })
          );

          window.sessionStorage.setItem(
            session_storage_keys__map.ss__sds__auth_ref,
            JSON.stringify({
              id: _obj.id,
              hashed: _obj.hashed,
            })
          );

          return true;
        });
        break;
      case "sign_up":
        fn_API__auth__promise = fn_wrap__fb_POST<I_auth__sign_up_account>(
          fn_POST__auth__sign_up,
          s__form_infos__obj as I_auth__sign_up_account
        );
        break;
      default:
        throw new Error("LOC:SignContainer");
    }

    fn_API__auth__promise
      .then((is_success) => {
        let msg__alert;

        if (is_success) {
          msg__alert = "성공";
          prop__setter__close_modal();
        } else {
          msg__alert = "실패";
        }

        window.alert(msg__alert);
      })
      .catch((err) => fn_handle__error__ctx(err, "LOC: fn_handle__submit__form(SignContainer)"));
  };

  const fn_handle__change__input: T_Handler<React.ChangeEvent> = (e) => {
    e.stopPropagation();

    const e_tg__curr = e.currentTarget as HTMLInputElement;
    const e_tg__name = e_tg__curr.getAttribute("name") as string;
    const e_tg__value = e_tg__curr.value;

    set_s__form_infos__obj({
      ...s__form_infos__obj,
      [e_tg__name]: e_tg__value,
    });
  };

  return (
    <Container style_obj={styles} className={"wrapper__sign_container"} onSubmit={(e) => fn_handle__submit__form(e)}>
      <Field className={styles.box__group} prop__legend={prop__mode ?? undefined}>
        <UList className={styles.box__list}>
          {prop__items.map((item__obj) => {
            const { id, content } = item__obj;
            return (
              <Item key={id} prop__id={id} className={styles.box__item}>
                <label htmlFor={id}>{content}</label>
                <Input id={id} name={id} placeholder={""} onChange={(e) => fn_handle__change__input(e)} />
              </Item>
            );
          })}
        </UList>
        <BtnBox style_obj={styles} className={"box__button"} type="submit" _content={"제출"} />
      </Field>
    </Container>
  );
}
