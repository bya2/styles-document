import "styles/session/index.scss";
import CompInput from "components/reusable/_input";
import { fn_logic__GET__auth__sign_in } from "logic/api/get";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { g_state__user } from "recoil/atoms";

const form_items__arr = [
  {
    key: "sign_in_id",
    name: "id",
    label: "아이디",
  },
  {
    key: "sign_in_pw",
    name: "password",
    label: "비밀번호",
  },
];

const init_state__sign_info__obj = form_items__arr.reduce((obj, item__arr) => {
  obj[item__arr.name] = null;
  return obj;
}, {});

export default function CompSignIn({ prop__fn_set__close_modal__item }) {
  // Global State
  const [g_state__ref_hashed_user, set_g_state__ref_hashed_user] = useRecoilState(g_state__user);

  // Local State
  const [state__sign_in_info__obj, set_state__sign_in_info__obj] = useState(init_state__sign_info__obj);

  // Navigator
  const navigator = useNavigate();

  // Logic

  // Event
  const fn_handle__submit__sign_in_form = (e) => {
    e.preventDefault();
    fn_logic__GET__auth__sign_in(state__sign_in_info__obj)
      .then((res_data__obj) => {
        const { code } = res_data__obj;
        if (code === 200) {
          set_g_state__ref_hashed_user(sessionStorage.getItem("ref_hashed_user"));
          prop__fn_set__close_modal__item();
          navigator(state__sign_in_info__obj.id);
        }
      })
      .catch((err) => {
        console.log("!ERR\nLoc:/src/components/session/sign_in");
        console.error(err);
      });
  };

  const fn_handle__change__sign_in_info = (e) => {
    e.stopPropagation();
    const e_curr_tg = e.currentTarget;
    const e_curr_tg_name = e_curr_tg.getAttribute("name");
    const e_curr_tg_value = e_curr_tg.value;
    set_state__sign_in_info__obj({
      ...state__sign_in_info__obj,
      [e_curr_tg_name]: e_curr_tg_value,
    });
  };

  return (
    <div className="comp sign_in box">
      <div className="inner">
        <form onSubmit={(e) => fn_handle__submit__sign_in_form(e)}>
          <fieldset className="form-inner">
            <legend>{"로그인"}</legend>
            <div className="warn form-group">
              {true ? (
                <>
                  <div className="icon-box">
                    <i className={`icon ${1}`}>N</i>
                  </div>
                  <div className="content-box">
                    <span>{"로그인 실패"}</span>
                  </div>
                </>
              ) : undefined}
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
                      onChange={(e) => fn_handle__change__sign_in_info(e)}
                    />
                  </div>
                );
              })}
            </>
            <div className="btn-wrap form-group">
              <button type="submit">{"로그인"}</button>
            </div>
          </fieldset>
        </form>
      </div>
    </div>
  );
}
