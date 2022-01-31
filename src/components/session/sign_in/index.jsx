import "../../../styles/session/sign_in.scss";
import { fn_logic__GET__auth__sign_in } from "../../../logic/api/get";
import obj_cls__fas_icon from "../../../icon/font_awesome";
import { useState } from "react";

const { cls__icon_fail } = obj_cls__fas_icon;

const LEGEND__STR_CONETNT = "Sign In";
const MSG__STR_LOGIN_FAIL = "로그인 실패";

const arr_form_group__data = [
  {
    label: "ID",
    input_id: "sign_up_id",
    input_name: "id",
  },
  {
    label: "Password",
    input_id: "sign_up_password",
    input_name: "password",
  },
];
const init_state__obj_sign_in_info = { id: "", password: "" };

const Comp_session__sign_in = ({ fn_setter__state__close_modal }) => {
  /**
   * State
   */
  const [state__obj_sign_in_info, set_state__obj_sign_in_info] = useState(
    init_state__obj_sign_in_info
  );
  const [state__is_req, set_state__is_req] = useState(false);

  /**
   * Navigator
   */
  // const navigator = useNavigate();

  /**
   * Logic
   */
  const fn_logic__submit_form__validation = () => {
    fn_logic__GET__auth__sign_in(state__obj_sign_in_info).then((status) => {
      if (status === 400 || status === 404) {
        set_state__is_req(true);
      }
      if (status === 200) {
        fn_setter__state__close_modal();
      }
    });
  };

  /**
   * Handler
   */
  const fn_handler__on_submit__sign_in_form = (e) => {
    e.preventDefault();
    fn_logic__submit_form__validation();
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
          <legend>{LEGEND__STR_CONETNT}</legend>
          <div className="warning_group">
            {state__is_req ? (
              <>
                <i className={`icon ${cls__icon_fail}`}></i>
                <p className="text">{MSG__STR_LOGIN_FAIL}</p>
              </>
            ) : (
              <></>
            )}
          </div>
          <>
            {arr_form_group__data.map((obj_data) => (
              <div className="form_group__label_input" key={obj_data.label}>
                <label htmlFor={obj_data.input_id}>{obj_data.label}</label>
                <input
                  type="text"
                  id={obj_data.input_id}
                  name={obj_data.input_name}
                  placeholder={obj_data.label}
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

export default Comp_session__sign_in;
