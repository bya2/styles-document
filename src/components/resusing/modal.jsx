import ReactDOM from "react-dom";

import "../../styles/reusing/modal.scss";
import font_awesome from "../../icon/font_awesome.json";
import { useState } from "react";

const Comp_modal__reusing = ({
  children,
  state__is_click__elem,
  fn_setter__state__close_modal,
}) => {
  // Local state
  const [state__is_mouse_down, set_state__is_mouse_down] = useState(false);

  // Handler
  const fn_handler__on_mouse_down__close_icon = (e) => {
    set_state__is_mouse_down(true);
    e.target.addEventListener("mouseup", () => {
      set_state__is_mouse_down(false);
    });
  };

  return (
    state__is_click__elem &&
    ReactDOM.createPortal(
      <article
        className="modal_wrapper"
        onMouseDown={(e) => {
          e.target.addEventListener("mouseup", () => {
            fn_setter__state__close_modal();
          });
        }}
        onMouseUp={(e) => {
          e.target.addEventListener("mouseup", () => {
            set_state__is_mouse_down(false);
          });
        }}
      >
        <div
          className="modal_inner"
          onMouseDown={(e) => {
            e.stopPropagation();
          }}
        >
          <div
            className={`modal_close_button ${state__is_mouse_down && "close"}`}
            onMouseDown={(e) => {
              fn_handler__on_mouse_down__close_icon(e);
              e.target.addEventListener("mouseup", () =>
                fn_setter__state__close_modal()
              );
            }}
          >
            <i className={font_awesome.cls_icon__close_modal}></i>
          </div>
          {children}
        </div>
      </article>,
      document.getElementById("modal")
    )
  );
};

export default Comp_modal__reusing;
