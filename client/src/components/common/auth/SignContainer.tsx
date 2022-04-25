import styles from "@styles-components/Auth.module.scss";

import { useState } from "react";
import { useAppDispatch } from "@/store/hooks";

import Container from "@/components/reusable/area/Container";
import UList from "@components/reusable/bar/UList";
import Field from "@/components/reusable/bar/Field";
import Btn from "@components/reusable/box/Button";
import Input from "@components/reusable/elements/Input";

import { fn_get__str_map__obj } from "@/logic/reusable";
import type { I_obj } from "@/models/reusables";
import type { T_Handler } from "@/models/function";
import { set_s__status__close_modal } from "@/store/reusable/modal";

interface I_props {
  prop__mode?: string;
  prop__items?: I_obj[];
  prop__api?: (obj?: any) => Promise<any>;
  prop__setter__close_modal: () => void;
}

export default function AuthContainer({ prop__mode, prop__items = [], prop__api, prop__setter__close_modal }: I_props) {
  // State
  const dispatch = useAppDispatch();
  const [s__form_infos__obj, set_s__form_infos__obj] = useState(fn_get__str_map__obj(prop__items));

  // Event
  const fn_handle__submit__form: T_Handler<React.FormEvent> = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!prop__api) return;

    prop__api(s__form_infos__obj)
      .then(obj => {
        
      })
      .then(() => {
        // dispatch(set_s__status__close_modal());
        prop__setter__close_modal();
      });
  };

  const fn_handle__change__input: T_Handler<React.ChangeEvent> = (e) => {
    e.stopPropagation();

    const e_tg__curr = e.currentTarget as HTMLInputElement;
    const e_tg__name = e_tg__curr.getAttribute("name") as string;
    const e_tg__value = e_tg__curr.value;

    console.log(e_tg__name, e_tg__value);

    set_s__form_infos__obj({
      ...s__form_infos__obj,
      [e_tg__name]: e_tg__value,
    });
  };

  return (
    <Container className={styles.wrapper__sign_container} onSubmit={(e) => fn_handle__submit__form(e)}>
      <Field className={styles.box__group} prop__legend={prop__mode ?? undefined}>
        <UList className={styles.box__list}>
          {
            prop__items.map((item__obj) => {
              const { id, content } = item__obj;
              return (
                <li key={id} data-key={id} className={styles.box__item}>
                  <label htmlFor={id}>{content}</label>
                  <Input
                    id={id}
                    name={id}
                    placeholder={""}
                    onChange={(e) => fn_handle__change__input(e)}
                  />
                </li>
              );
            })
          }
        </UList>
        <Btn
          className={styles.box__button}
          buttonType="submit"
          prop__element={<span>{"제출"}</span>}
        />
      </Field>
    </Container>
  );
}
