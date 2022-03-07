import "styles/session/index.scss";
import CompInput from "components/reusable/_input";
import { fn_logic__POST__auth__sign_up } from "logic/api/post";
import { fn_logic__hash__create_DIGEST, fn_logic__hash__compare_PWD } from "logic/hash";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const VALID__SUCCESS_SIGN_UP__NUM = 1;
const NO_VALID__SAME_PW__NUM = 2;
const NO_VALID__HASHED__NUM = 3;

const form_items__arr = [
  {
    key: "sign_up_id",
    name: "id",
    label: "아이디",
  },
  {
    key: "sign_up_email",
    name: "email",
    label: "이메일",
  },
  {
    key: "sign_up_pw",
    name: "password",
    label: "비밀번호",
  },
  {
    key: "sign_up_chk_pw",
    name: "chk_password",
    label: "비밀번호 확인",
  },
];

const init_state__sign_info__obj = form_items__arr.reduce((obj, item__arr) => {
  obj[item__arr.name] = null;
  return obj;
}, {});

export default function CompSignUp({ prop__fn_set__close_modal__item }) {
  // Local State
  const [state__sign_up_info__obj, set_state__sign_up_info__obj] = useState(init_state__sign_info__obj);
  const [state__valid_sign_up__str, set_state__valid_sign_up__str] = useState(null);

  // Navigator
  const navigator = useNavigate();

  // Logic
  const fn_logic__hash__password = (_password) => {
    const hashed = fn_logic__hash__create_DIGEST(_password);
    const cond__is_valid__hashed = fn_logic__hash__compare_PWD(_password, hashed);
    if (!cond__is_valid__hashed) return false;
    return hashed;
  };

  const fn_logic__print__valid_message = () => {
    switch (state__valid_sign_up__str) {
      case VALID__SUCCESS_SIGN_UP__NUM:
        return "회원가입 성공.";
      case NO_VALID__SAME_PW__NUM:
        return "비밀번호를 확인하십시오.";
      case NO_VALID__HASHED__NUM:
        return "클라이언트 해싱 오류";
      default:
        return null;
    }
  };

  // Event
  const fn_handle__submit__sign_up_form = (e) => {
    e.preventDefault();
    const { password, chk_password } = state__sign_up_info__obj;

    const cond__is_same__password = password === chk_password;
    if (!cond__is_same__password) {
      set_state__valid_sign_up__str(NO_VALID__SAME_PW__NUM);
      return;
    }

    const hashed = fn_logic__hash__password(password);
    if (!hashed) {
      set_state__valid_sign_up__str(NO_VALID__HASHED__NUM);
      return;
    }

    fn_logic__POST__auth__sign_up({ ...state__sign_up_info__obj, hashed_password: hashed }).then((cond__is_success__bool) => {
      console.log(cond__is_success__bool);
      if (cond__is_success__bool) {
        // 서버의 리스폰스가 없는 것으로 추정 (나중에 수정)
        set_state__valid_sign_up__str(VALID__SUCCESS_SIGN_UP__NUM);
        prop__fn_set__close_modal__item();
      }
    });

    set_state__valid_sign_up__str(VALID__SUCCESS_SIGN_UP__NUM);
    prop__fn_set__close_modal__item();
  };

  const fn_handle__change__sign_up_info = (e) => {
    e.stopPropagation();
    const e_curr_tg = e.currentTarget;
    const e_curr_tg_name = e_curr_tg.getAttribute("name");
    const e_curr_tg_value = e_curr_tg.value;
    set_state__sign_up_info__obj({
      ...state__sign_up_info__obj,
      [e_curr_tg_name]: e_curr_tg_value,
    });
  };

  return (
    <div className="comp sign_in box">
      <div className="inner">
        <form onSubmit={(e) => fn_handle__submit__sign_up_form(e)}>
          <fieldset className="form-inner">
            <legend>{"회원가입"}</legend>
            <div className="warn form-group">
              {state__valid_sign_up__str ? (
                <>
                  <div className="icon-box">
                    <i className={`icon ${1}`}>N</i>
                  </div>
                  <div className="content-box">
                    <span>{fn_logic__print__valid_message()}</span>
                  </div>
                </>
              ) : null}
            </div>
            <>
              {form_items__arr.map((form_item__obj) => {
                const { key, name, label } = form_item__obj;
                return (
                  <div key={key} className={`${name} form-group`}>
                    <label htmlFor={key}>{label}</label>
                    <CompInput
                      type={"text"}
                      id={key}
                      name={name}
                      placeholder={label}
                      onChange={(e) => fn_handle__change__sign_up_info(e)}
                    />
                  </div>
                );
              })}
            </>
            <div className="btn-wrap form-group">
              <button type="submit">{"회원 가입"}</button>
            </div>
          </fieldset>
        </form>
      </div>
    </div>
  );
}
