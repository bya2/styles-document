import { useEffect, useState } from "react";

import "../../../styles/header/menu/index.scss";

import Search from "./search";

import obj_cls__fas_icon from "../../../icon/font_awesome";
const { cls__icon_bars, cls__icon_search } = obj_cls__fas_icon;

const arr_menu_elems = [
  {
    alt: "menu",
    i_cls: cls__icon_bars,
    comp: <></>,
  },
  {
    alt: "search",
    i_cls: cls__icon_search,
    comp: <></>,
  },
];

const init_state__obj_is_occur_event__elem = arr_menu_elems.reduce((obj, t) => {
  obj[t.alt] = false;
  return obj;
}, {});

const Comp_menu__header = () => {
  /**
   * State
   */
  const [state__obj_is_mouse_down__elem, set_state__obj_is_mouse_down__elem] =
    useState(init_state__obj_is_occur_event__elem);
  const [state__obj_is_click__elem, set_state__obj_is_click__elem] = useState(
    init_state__obj_is_occur_event__elem
  );

  /**
   * Setter
   */
  const fn_setter__mouse_down__elem = (e_tg) =>
    set_state__obj_is_mouse_down__elem({
      ...state__obj_is_mouse_down__elem,
      [e_tg.getAttribute("name")]: true,
    });

  const fn_setter__mouse_up__elem = () =>
    set_state__obj_is_mouse_down__elem(init_state__obj_is_occur_event__elem);

  const fn_setter__state__click_elem = (e_curr_tg_name) =>
    set_state__obj_is_click__elem({
      ...state__obj_is_click__elem,
      [e_curr_tg_name]: state__obj_is_click__elem[e_curr_tg_name]
        ? false
        : true,
    });

  const fn_setter__state__blur_elem = (e_curr_tg_name) =>
    set_state__obj_is_click__elem({
      ...state__obj_is_click__elem,
      [e_curr_tg_name]: false,
    });

  /**
   * Side
   */
  useEffect(() => {
    document.addEventListener(
      "keydown keyup",
      (e) => {
        const key = e.keyCode;
        const tg = e.target;
        console.log(key, tg);
      },
      []
    );
  });

  /**
   * Handler
   */
  const fn_handler__on_mouse_down__elem = (e) => {
    const e_curr_tg = e.currentTarget;
    fn_setter__mouse_down__elem(e_curr_tg);
  };

  const fn_handler__on_mouse_up__elem = () => {
    fn_setter__mouse_up__elem();
  };

  const fn_handler__on_click__elem = (e) => {
    const e_curr_tg_name = e.currentTarget.getAttribute("name");
    fn_setter__state__click_elem(e_curr_tg_name);
  };

  const fn_handler__on_blur__elem = (e) => {
    const e_curr_tg_name = e.currentTarget.getAttribute("name");
    fn_setter__state__blur_elem(e_curr_tg_name);
  };

  return (
    <span className="comp_menu__header">
      <ul className="elem_list" onMouseUp={fn_handler__on_mouse_up__elem}>
        {arr_menu_elems.map((obj_elem) => (
          <li
            key={obj_elem.alt}
            name={obj_elem.alt}
            className={`elem_group ${
              state__obj_is_mouse_down__elem[obj_elem.alt]
                ? "state__mouse_down"
                : undefined
            } ${
              state__obj_is_click__elem[obj_elem.alt]
                ? "state__click"
                : undefined
            }`}
            onMouseDown={fn_handler__on_mouse_down__elem}
            onClick={fn_handler__on_click__elem}
            onBlur={
              obj_elem.alt === "search" ? fn_handler__on_blur__elem : undefined
            }
          >
            {obj_elem.alt !== "search" ? (
              <>
                <i className={`icon ${obj_elem.i_cls}`}></i>
                <p className="name">{obj_elem.alt}</p>
              </>
            ) : (
              <Search
                state__is_click__search={
                  state__obj_is_click__elem[obj_elem.alt]
                }
              />
            )}
          </li>
        ))}
      </ul>
    </span>
  );
};

export default Comp_menu__header;
