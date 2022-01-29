import { useState } from "react";
// import { useNavigate } from "react-router-dom";

import "../../styles/session/sign_in.scss";
// import obj_cls__fas_icon from "../../icon/font_awesome";

// import { fn_logic__GET__auth__sign_in } from "../../logic/api/get";

// const { cls__icon_fail } = obj_cls__fas_icon;

// Value
const STR_LEGEND_WRITE_AREA = "Sign In";

const arr_form_group__data = [
  {
    label_value: "ID",
    input_id: "sign_up_id",
    input_name: "id",
  },
  {
    label_value: "Password",
    input_id: "sign_up_password",
    input_name: "password",
  },
];

const SessionSignIn = () => {
  // Local state
  const [state__obj_sign_in_info, set_state__obj_sign_in_info] = useState({
    id: "",
    password: "",
  });

  // Navigator
  // const navigator = useNavigate();

  // Handler
  const fn_handler__on_submit__sign_in_form = (e) => {
    e.preventDefault();
    // fn_GET__sign_in();
  };

  const fn_handler__on_change__sign_in_info = (e) => {
    set_state__obj_sign_in_info({
      ...state__obj_sign_in_info,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };

  return (
    <div className="sign_in_wrapper">
      <form onSubmit={fn_handler__on_submit__sign_in_form}>
        <fieldset className="form_inner__write_area">
          <legend>{STR_LEGEND_WRITE_AREA}</legend>
          <>
            {arr_form_group__data.map((obj_data) => (
              <div
                className="form_group__label_input"
                key={obj_data.label_value}
              >
                <label htmlFor={obj_data.input_id}>
                  {obj_data.label_value}
                </label>
                <input
                  type="text"
                  id={obj_data.input_id}
                  name={obj_data.input_name}
                  placeholder={obj_data.label_value}
                  onChange={fn_handler__on_change__sign_in_info}
                />
              </div>
            ))}
          </>
        </fieldset>
        <button type="submit">BUTTON</button>
      </form>
    </div>
  );
};

export default SessionSignIn;
