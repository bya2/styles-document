import { useState } from "react";

import "../../../styles/main/r__id__doc/selector.scss";
import font_awesome from "../../../icon/font_awesome.json";

import ElemEditor from "./elem_editor";

const arr_selectors = [
  {
    alt: "palette",
    cls_icon: font_awesome.cls_icon__palette,
  },
  {
    alt: "typography",
    cls_icon: font_awesome.cls_icon__typography,
  },
  {
    alt: "markdown",
    cls_icon: font_awesome.cls_icon__markdown,
  },
];

const ElemTypeSelector = () => {
  /**
   * State
   */
  const [state__str_elem_type, set_state__str_elem_type] = useState(null);

  /**
   * Setter
   */
  const fn_setter__toggle_editor = (e_curr_tg_name) => {
    set_state__str_elem_type(
      state__str_elem_type === e_curr_tg_name ? null : e_curr_tg_name
    );
  };

  const fn_setter__close_editor = () => {
    set_state__str_elem_type(null);
  };

  /**
   * Handler
   */
  const fn_handler__on_click__icon_box = (e) => {
    const e_curr_tg = e.currentTarget;
    const e_curr_tg_name = e_curr_tg.getAttribute("name");
    fn_setter__toggle_editor(e_curr_tg_name);
  };

  return (
    <>
      <article className="comp_selector outer">
        <div className="inner">
          <>
            {arr_selectors.map((obj_selector) => (
              <div
                key={obj_selector.alt}
                className={`selector_wrapper ${
                  state__str_elem_type === obj_selector.alt
                    ? "state__active"
                    : undefined
                }`}
                name={obj_selector.alt}
                onClick={fn_handler__on_click__icon_box}
              >
                <i
                  key={obj_selector.alt}
                  className={`icon_box ${obj_selector.cls_icon}`}
                />
                <div className="tooltip">{obj_selector.alt}</div>
              </div>
            ))}
          </>
        </div>
      </article>
      {
        <ElemEditor
          state__str_elem_type={state__str_elem_type}
          fn_setter__close_editor={fn_setter__close_editor}
        />
      }
    </>
  );
};

export default ElemTypeSelector;
