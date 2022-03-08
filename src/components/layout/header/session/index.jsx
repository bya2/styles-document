import { useState, useMemo, useEffect } from "react";
import { useRecoilState } from "recoil";
import { g_state__user } from "recoil/atoms";

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

const init_state__cond__obj = [...sign_out_state__session_items__arr, ...sign_in_state__session_items__arr].reduce(
  (obj, menu_elem__obj) => {
    obj[menu_elem__obj.key] = false;
    return obj;
  },
  {}
);

export default function CompSession() {
  // Global State
  const [g_state__user__obj, set_g_state__user__obj] = useRecoilState(g_state__user);
  const { ref_user_id, ref_hashed_user } = g_state__user__obj;

  // Local State
  const [state__is_click_item__obj, set_state__is_click_item__obj] = useState(init_state__cond__obj);
  const { sess_sign_out: state__is_click_sign_out__bool } = state__is_click_item__obj;

  // Cache
  const memo__cond__is_sign_in = useMemo(() => ref_user_id !== null && ref_hashed_user !== null, [g_state__user__obj]);

  // Logic
  const fn_set__close_modal__item = () => {
    set_state__is_click_item__obj(init_state__cond__obj);
  };

  const fn_set__content__item = (_sess_item__obj) => {
    const { key, value } = _sess_item__obj;
    switch (key) {
      case "sess_sign_out":
        return value;
      case "sess_user":
        return sessionStorage.getItem("ref_user_id");
      default:
        return null;
    }
  };

  useEffect(() => {
    if (state__is_click_sign_out__bool) {
      window.sessionStorage.removeItem("ref_user_id");
      window.sessionStorage.removeItem("ref_hashed_user");
      set_g_state__user__obj({
        ref_user_id: window.sessionStorage.getItem("ref_user_id"),
        ref_hashed_user: window.sessionStorage.getItem("ref_hashed_user"),
      });
    }
  }, [state__is_click_sign_out__bool]);

  // Event
  const fn_handle__mouse_down__item = (e) => {
    const e_curr_tg = e.currentTarget;
    const e_curr_tg_name = e_curr_tg.getAttribute("name");

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
            {memo__cond__is_sign_in
              ? sign_in_state__session_items__arr.map((sess_item__obj) => {
                  const { key, icon } = sess_item__obj;
                  return (
                    <li key={key} name={key} className="item" onMouseDown={(e) => fn_handle__mouse_down__item(e)}>
                      <div className="item-inner">
                        <span className="icon-box">
                          <i className={`icon ${icon}`}>E</i>
                        </span>
                        <span className="content-box">{fn_set__content__item(sess_item__obj)}</span>
                      </div>
                    </li>
                  );
                })
              : sign_out_state__session_items__arr.map((sess_item__obj) => {
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
