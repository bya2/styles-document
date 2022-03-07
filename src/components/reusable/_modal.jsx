import "styles/reusable/_modal.scss";

import { useState } from "react";
import ReactDOM from "react-dom";

// import {} from "icon/fs";

export default function CompModal({ children, prop__cond__is_click_item__bool, prop__fn_set__close_modal__item }) {
  // State
  const [state__is_mouse_down__bool, set_state__is_mouse_down__bool] = useState(false);

  // Event
  const fn_handle__mouse_down__outer = (e) => {
    e.stopPropagation();
    e.currentTarget.addEventListener("mouseup", () => prop__fn_set__close_modal__item(), { once: true });
  };

  const fn_handle__mouse_down__close_icon = (e) => {
    e.stopPropagation();
    set_state__is_mouse_down__bool(true);
    const fn_handle__mouse_up__close_icon = () => {
      set_state__is_mouse_down__bool(false);
      prop__fn_set__close_modal__item();
    };
    window.addEventListener("mouseup", fn_handle__mouse_up__close_icon, { once: true });
  };

  return (
    prop__cond__is_click_item__bool &&
    ReactDOM.createPortal(
      <article className="comp modal outer" onMouseDown={(e) => fn_handle__mouse_down__outer(e)} onMouseUp={(e) => {}}>
        <div className="inner" onMouseDown={(e) => e.stopPropagation()}>
          <div
            className={`close-btn${state__is_mouse_down__bool ? " s-mouse-down" : ""}`}
            onMouseDown={(e) => fn_handle__mouse_down__close_icon(e)}
          >
            <i className={`icon ${1}`}>X</i>
          </div>
          {children}
        </div>
      </article>,
      document.getElementById("modal")
    )
  );
}
