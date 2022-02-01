import "../../../../../styles/main/aside/left/tool/index.scss";
import cls_list__fas_icon from "../../../../../icon/font_awesome";
import {} from "../../../../../logic/api/post";
import { ref__input } from "../explorer/layer";

import React, { useEffect, useState } from "react";

const { cls__icon_doc_plus, cls__icon_group_plus, cls__icon_refresh } =
  cls_list__fas_icon;

const tool_list__arr_elems = [
  {
    alt: "add_doc",
    icon: cls__icon_doc_plus,
  },
  {
    alt: "add_group",
    icon: cls__icon_group_plus,
  },
  {
    alt: "refresh",
    icon: cls__icon_refresh,
  },
];

const init_state__occur_event__tool_elem = tool_list__arr_elems.reduce(
  (obj, t) => {
    obj[t.alt] = false;
    return obj;
  },
  {}
);

const Comp_tool__left_aside = () => {
  console.log("Comp_tool__left_aside");

  /**
   * State
   */
  const [state__obj_is_click__tool_elem, set_state__obj_is_click__tool_elem] =
    useState(init_state__occur_event__tool_elem);

  /**
   * Setter
   */
  const fn_setter__click__tool_elem = (e_curr_tg_name) => {
    set_state__obj_is_click__tool_elem({
      ...state__obj_is_click__tool_elem,
      [e_curr_tg_name]: true,
    });
  };

  const fn_setter__after_focus__ref__input = () =>
    set_state__obj_is_click__tool_elem(init_state__occur_event__tool_elem);

  /**
   * Side
   */
  useEffect(() => {
    if (
      state__obj_is_click__tool_elem.add_group ||
      state__obj_is_click__tool_elem.add_doc
    ) {
      ref__input.current.focus();
      fn_setter__after_focus__ref__input();
    }
  }, [
    state__obj_is_click__tool_elem.add_group,
    state__obj_is_click__tool_elem.add_doc,
  ]);

  useEffect(() => {}, [state__obj_is_click__tool_elem.refresh]);

  /**
   * Handler
   */
  const fn_handler__click__tool_elem = (e) => {
    const e_curr_tg_name = e.currentTarget.getAttribute("name");
    fn_setter__click__tool_elem(e_curr_tg_name);
  };

  return (
    <div className="comp_tool__left_aside">
      <ul className="no_space list__a_row">
        <>
          {tool_list__arr_elems.map((obj_elem) => (
            <li
              key={obj_elem.alt}
              name={obj_elem.alt}
              className="col"
              onClick={fn_handler__click__tool_elem}
            >
              <i className={`icon ${obj_elem.icon}`}></i>
            </li>
          ))}
        </>
      </ul>
    </div>
  );
};

export default Comp_tool__left_aside;
