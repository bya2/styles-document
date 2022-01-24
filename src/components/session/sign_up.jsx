import { useState } from "react";

import axios from "axios";
import qs from "qs";

import "../../styles/session/sign_up.scss";
import { URL__SIGN_UP } from "../../config/server";
import { ERR_MSG__SIGN_UP } from "../../config/message";

// Value
const str_legend__write_area = "Sign up";

const arr_form_group__data = [
  {
    label_value: "ID",
    input_id: "sign_up_id",
    input_name: "id",
  },
  {
    label_value: "Email",
    input_id: "sign_up_email",
    input_name: "email",
  },
  {
    label_value: "Password",
    input_id: "sign_up_password",
    input_name: "password",
  },
  {
    label_value: "Check password",
    input_id: "sign_up_chk_password",
    input_name: "chk_password",
  },
];

const STR__SIGN_UP_SUCCESS = "회원가입에 성공하셨습니다.";
const STR__SIGN_UP_FAIL = "회원가입에 문제가 발생하였습니다.";

/*
 *  Context
 */
const SessionSignUp = ({ is_click_sign_up }) => {
  // Local state
  const [state__sign_up_info, set_state__sign_up_info] = useState({
    id: "",
    password: "",
    check_password: "",
    email: "",
  });
  const [state__is_sign_up, set_state__is_sign_up] = useState(false);
  const [state__is_success_sign_up, set_state__is_success_sign_up] =
    useState(false);

  // API
  const fn_POST__sign_up_info = () => {
    axios
      .post(URL__SIGN_UP, qs.stringify(state__sign_up_info))
      .then((res) => {
        console.log(res.data);
        set_state__is_success_sign_up(true);
      })
      .catch((err) => {
        console.error(`${ERR_MSG__SIGN_UP}${err}`);
        set_state__is_success_sign_up(false);
      })
      .then(() => {
        set_state__is_sign_up(true);
      });
  };

  // Handler
  const fn_handler__on_submit__sign_up_form = (e) => {
    e.preventDefault();
    fn_POST__sign_up_info();
  };

  const fn_handler__on_change__sign_up_info = (e) => {
    set_state__sign_up_info({
      ...state__sign_up_info,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };

  return (
    <div className="sign_up_wrapper">
      <form onSubmit={fn_handler__on_submit__sign_up_form}>
        <fieldset className="form_inner__write_area">
          <legend>{str_legend__write_area}</legend>
          <>
            {arr_form_group__data.map((obj_data) => (
              <div
                key={obj_data.label_value}
                className="form_group__label_input"
              >
                <label htmlFor={obj_data.input_id}>
                  {obj_data.label_value}
                </label>
                <input
                  type="text"
                  id={obj_data.input_id}
                  name={obj_data.input_name}
                  placeholder={obj_data.label_value}
                  onChange={fn_handler__on_change__sign_up_info}
                />
              </div>
            ))}
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

export default SessionSignUp;
