import "styles/reusable/modal.scss";

import { useState } from "react";
import ReactDOM from "react-dom";

import {} from "icon/fs";

export default function CompModal({ children, prop__cond__is_click, prop__fn_set__close_modal }) {
  // State
  const [state__is_mouse_down__bool, set_state__is_mouse_down__bool] = useState(false);

  // Event
  const fn_handle__mouse_down__outer = (e) => {
    e.currentTarget.addEventListener("mouseup", () => prop__fn_set__close_modal(), { once: true });
    e.stopPropagation();
  };

  const fn_handle__mouse_down__close_icon = (e) => {
    const e_curr_tg = e.currentTarget;

    set_state__is_mouse_down__bool(true);
    const fn_handle__mouse_up__close_icon = () => set_state__is_mouse_down__bool(false);
    window.addEventListener("mouseup", fn_handle__mouse_up__close_icon, { once: true });
    e.stopPropagation();
  };

  return prop__cond__is_click
    ? ReactDOM.createPortal(
        <div className="comp modal outer" onMouseDown={(e) => fn_handle__mouse_down__outer(e)} onMouseUp={(e) => {}}>
          <div className="inner" onMouseDown={(e) => e.stopPropagation()}>
            <div className={`close-btn ${1}`} onMouseDown={(e) => fn_handle__mouse_down__close_icon(e)}>
              <i className={1}></i>
            </div>
            {children}
          </div>
        </div>
      )
    : undefined;
}

// state__is_click__elem &&
// ReactDOM.createPortal(
//   <article
//     className="modal_wrapper"
//     onMouseDown={(e) => {
//       e.target.addEventListener("mouseup", () => {
//         fn_setter__state__close_modal();
//       });
//     }}
//     onMouseUp={(e) => {
//       e.target.addEventListener("mouseup", () => {
//         set_state__is_mouse_down(false);
//       });
//     }}
//   >
//     <div
//       className="modal_inner"
//       onMouseDown={(e) => {
//         e.stopPropagation();
//       }}
//     >
//       <div
//         className={`modal_close_button ${state__is_mouse_down && "close"}`}
//         onMouseDown={(e) => {
//           fn_handler__on_mouse_down__close_icon(e);
//           e.target.addEventListener("mouseup", () =>
//             fn_setter__state__close_modal()
//           );
//         }}
//       >
//         <i className={font_awesome.cls_icon__close_modal}></i>
//       </div>
//       {children}
//     </div>
//   </article>,
//   document.getElementById("modal")
// )
// );
