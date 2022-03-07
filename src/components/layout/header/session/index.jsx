import { useState } from "react";

import CompModal from "components/reusable/_modal";
import CompSignIn from "components/session/sign_in.jsx";
import CompSignUp from "components/session/sign_up";

const sign_out_state__session_items__arr = [
  {
    key: "sess_sign_in",
    icon: "",
    value: "로그인",
    comp: (_fn) => <CompSignIn prop__fn_set__close_modal__item={_fn} />,
  },
  {
    key: "sess_sign_up",
    icon: "",
    value: "회원가입",
    comp: (_fn) => <CompSignUp prop__fn_set__close_modal__item={_fn} />,
  },
];

const sign_in_state__session_items__arr = [
  {
    key: "sess_sign_out",
    icon: "",
    value: "로그아웃",
  },
  {
    key: "sess_user",
    icon: "",
    value: "사용자",
  },
];

const init_state__cond__obj = sign_out_state__session_items__arr.reduce((obj, menu_elem__obj) => {
  obj[menu_elem__obj.key] = false;
  return obj;
}, {});

export default function CompSession() {
  // Global State

  // Local State
  const [state__is_click_item__obj, set_state__is_click_item__obj] = useState(init_state__cond__obj);

  // Logic
  const fn_set__close_modal__item = () => {
    set_state__is_click_item__obj(init_state__cond__obj);
  };

  // Event
  const fn_handle__mouse_down__item = (e) => {
    const e_curr_tg = e.currentTarget;
    const e_curr_tg_name = e_curr_tg.getAttribute("name");

    console.log(e_curr_tg_name);

    window.addEventListener(
      "mouseup",
      () => {
        set_state__is_click_item__obj({
          ...state__is_click_item__obj,
          [e_curr_tg_name]: true,
        });
      },
      { once: true }
    );
  };

  return (
    <div className="comp session">
      <div className="outer">
        <ul className="item-list">
          <>
            {sign_out_state__session_items__arr.map((sess_item__obj) => {
              const { key, icon, value } = sess_item__obj;
              return (
                <li key={key} name={key} className="item" onMouseDown={(e) => fn_handle__mouse_down__item(e)}>
                  <div className="item-inner">
                    <span className="icon-box">
                      <i className={`icon ${icon}`}>D</i>
                    </span>
                    <span className="content-box">{value}</span>
                  </div>
                </li>
              );
            })}
          </>
        </ul>
        <>
          {sign_out_state__session_items__arr.map((sess_item__obj) => {
            const { key, icon, value, comp } = sess_item__obj;
            return (
              <CompModal
                key={`modal_${key}`}
                prop__cond__is_click_item__bool={state__is_click_item__obj[sess_item__obj.key]}
                prop__fn_set__close_modal__item={fn_set__close_modal__item}
              >
                {comp(fn_set__close_modal__item)}
              </CompModal>
            );
          })}
        </>
      </div>
    </div>
  );
}
