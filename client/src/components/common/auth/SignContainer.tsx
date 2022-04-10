import styles from "@styles-components/common/Auth.module.scss";

import React, { useState } from "react";
import { useAppSelector, useAppDispatch } from "@/store/hooks";

import Container from "@components/reusable/unit1/Container";
import Fieldset from "@components/reusable/elements/Fieldset";
import UList from "@components/reusable/elements/UList";
import Input from "@components/reusable/elements/Input";
import ButtonBox from "@components/reusable/unit1/ButtonBox";

import { fn_get__str_map__obj } from "@/logic/common";

import type { ISignContainerProps as Props } from "@models/Props";

export default function SignContainer({ prop__mode, prop__items = [], prop__api, prop__setter__close_modal }: Props) {
  // State
  // -- G
  const dispatch =  useAppDispatch();

  // -- L
  const [s__form_infos__obj, set_s__form_infos__obj] = useState(fn_get__str_map__obj(prop__items));

  // Event
  const fn_handle__submit__form = (e: React.FormEvent): void => {
    e.preventDefault();
    e.stopPropagation();

    if (!prop__api) return;

    prop__api(s__form_infos__obj)
      .then(obj => {
        
      })
      .then(() => {
        prop__setter__close_modal();
      });
  };

  const fn_handle__change__input = (e: React.ChangeEvent) => {
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
      <Fieldset className={styles.box__group} prop__legend={prop__mode ?? undefined}>
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
                    placeholder={"Inputs..."}
                    onChange={(e) => fn_handle__change__input(e)}
                  />
                </li>
              );
            })
          }
        </UList>
        <ButtonBox
          className={styles.box__button}
          type="submit"
          value="제출"
        />
      </Fieldset>
    </Container>
  );
}
