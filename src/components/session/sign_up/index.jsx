import { useState } from "react";

import "../../../styles/session/sign_up.scss";

import { fn_logic__POST__auth__sign_up } from "../../../logic/api/post";
import {
  fn_logic__hash__create_DIGEST,
  fn_logic__hash__compare_PWD,
} from "../../../logic/hash";

// Value
const LEGEND__STR_CONTENT = "Sign up";

const arr_form_group__data = [
  {
    label: "ID",
    input_type: "text",
    input_id: "sign_up_id",
    input_name: "id",
  },
  {
    label: "Email",
    input_type: "email",
    input_id: "sign_up_email",
    input_name: "email",
  },
  {
    label: "Password",
    input_type: "password",
    input_id: "sign_up_password",
    input_name: "password",
  },
  {
    label: "Check password",
    input_type: "password",
    input_id: "sign_up_chk_password",
    input_name: "chk_password",
  },
];

const STR__SIGN_UP_SUCCESS = "회원가입에 성공하셨습니다.";
const STR__SIGN_UP_FAIL = "회원가입에 문제가 발생하였습니다.";

const MSG__STR_WARNING__DIFF_PASSWORD = "비밀번호가 다름.";

const init_state__obj_sign_up_info = {
  id: "",
  password: "",
  chk_password: "",
  email: "",
};

/**
 * CONTEXT
 */
const Comp_session__sign_up = ({ fn_setter__state__close_modal }) => {
  /**
   * Local State
   */
  const [state__obj_sign_up_info, set_state__obj_sign_up_info] = useState(
    init_state__obj_sign_up_info
  );
  const [state__is_sign_up, set_state__is_sign_up] = useState(false);
  const [state__is_success_sign_up, set_state__is_success_sign_up] =
    useState(false);
  const [state__str_warning, set_state__str_warning] = useState("");

  /**
   * Setter
   */
  const fn_setter__success_sign_up = () => {
    set_state__is_success_sign_up(true);
  };
  const fn_setter__did_sign_up = () => set_state__is_sign_up(true);
  const fn_setter__no_warning = () => set_state__str_warning("");
  const fn_setter__diff_pwd = () =>
    set_state__str_warning(MSG__STR_WARNING__DIFF_PASSWORD);

  /**
   * Logic
   */
  const fn_logic__submit_form__is_diff_pwd = () => {
    const { password, chk_password } = state__obj_sign_up_info;
    const is_check = password === chk_password;
    return is_check;
  };

  const fn_logic__submit_form__hashing = () => {
    const hashed_password = fn_logic__hash__create_DIGEST(
      state__obj_sign_up_info.password
    );
    const is_hashed = fn_logic__hash__compare_PWD(
      state__obj_sign_up_info.password,
      hashed_password
    );
    if (is_hashed) {
      fn_logic__POST__auth__sign_up(
        {
          ...state__obj_sign_up_info,
          hashed_password,
        },
        fn_setter__success_sign_up
      );
    }
  };

  /**
   * Handler
   */
  const fn_handler__on_submit__sign_up_form = (e) => {
    e.preventDefault();
    const is_check = fn_logic__submit_form__is_diff_pwd();
    if (!is_check) {
      fn_setter__diff_pwd();
      setTimeout(fn_setter__no_warning, 3000);
      return;
    }
    fn_logic__submit_form__hashing();
    fn_setter__did_sign_up();
    fn_setter__state__close_modal();
  };

  const fn_handler__on_change__sign_up_info = (e) => {
    set_state__obj_sign_up_info({
      ...state__obj_sign_up_info,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };

  /**
   * Component
   */
  return (
    <div className="sign_up_wrapper">
      <form onSubmit={fn_handler__on_submit__sign_up_form}>
        <fieldset className="form_inner__write_area">
          <legend>{LEGEND__STR_CONTENT}</legend>
          <>
            {arr_form_group__data.map((obj_data) => (
              <div key={obj_data.label} className="form_group__label_input">
                <label htmlFor={obj_data.input_id}>{obj_data.label}</label>

                <input
                  type={obj_data.input_type}
                  id={obj_data.input_id}
                  name={obj_data.input_name}
                  placeholder={obj_data.label}
                  onChange={fn_handler__on_change__sign_up_info}
                />
              </div>
            ))}
            <p>{state__str_warning}</p>
          </>
        </fieldset>

        <button type="submit">BUTTON</button>
      </form>
      {state__is_sign_up ? (
        state__is_success_sign_up ? (
          <p>{STR__SIGN_UP_SUCCESS}</p>
        ) : (
          <p>{STR__SIGN_UP_FAIL}</p>
        )
      ) : (
        <p></p>
      )}
    </div>
  );
};

export default Comp_session__sign_up;
