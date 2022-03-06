import { useState } from "react";

const session_items__arr = [
  {
    key: "sess_sign_in",
    icon: "",
    value: "로그인",
  },
  {
    key: "sess_sign_up",
    icon: "",
    value: "회원가입",
  },
];

const init_state__cond__obj = session_items__arr.reduce((obj, menu_elem__obj) => {
  obj[menu_elem__obj.key] = false;
  return obj;
}, {});

export default function CompSession() {
  // Global State
  // Local State
  const [state__is_click_item__obj, set_state__is_click_item__obj] = useState(init_state__cond__obj);

  // Event
  const fn_handle__mouse_down__item = (e) => {
    const e_curr_tg = e.currentTargetl;
  };

  return (
    <div className="comp session">
      <div class="outer">
        <ul className="item-list">
          <>
            {session_items__arr.map((sess_item__obj) => {
              const { key, icon, value } = sess_item__obj;
              return (
                <li key={key} className="item" onMouseDown={(e) => fn_handle__mouse_down__item(e)}>
                  <div class="item-inner">
                    <span className="icon-box">
                      <i className={`icon`}>D</i>
                    </span>
                    <span className="content-box">{value}</span>
                  </div>
                </li>
              );
            })}
          </>
        </ul>
      </div>
    </div>
  );
}
