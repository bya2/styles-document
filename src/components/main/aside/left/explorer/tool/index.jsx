import "../../../../../../styles/main/aside/left/explorer/tool/index.scss";
import { ref__doc_input, ref__grp_input } from "../layer";
import cls_list__fas_icon from "../../../../../../icon/font_awesome";
// import { fn_logic__GET__exp__node_list } from "../../../../../../logic/api/get";
import { useEffect } from "react";
import { useState } from "react";
const { cls__icon_doc_plus, cls__icon_group_plus, cls__icon_refresh } =
  cls_list__fas_icon;

const tools__arr_elems = [
  {
    key: "tool__add_doc",
    func: "add-document",
    icon: cls__icon_doc_plus,
    ref: ref__doc_input,
  },
  {
    key: "tool__add_grp",
    func: "add-group",
    icon: cls__icon_group_plus,
    ref: ref__grp_input,
  },
  {
    key: "tool__refresh",
    func: "refresh-explorer-layer",
    icon: cls__icon_refresh,
    ref: null,
  },
];

const tool_attrs__arr_elems = tools__arr_elems.reduce((arr, tool__obj_elem) => {
  const { ref, ...rest__obj_elem } = tool__obj_elem;
  return [...arr, rest__obj_elem];
}, []);

const refs_of_key__obj_tool_elems = tools__arr_elems.reduce(
  (obj, tool__obj_elem) => {
    const { key, ref } = tool__obj_elem;
    if (ref) {
      return { ...obj, [key]: ref };
    }
    return obj;
  },
  {}
);

const init_state__bool__obj_tool_elems = tools__arr_elems.reduce(
  (obj, tool__obj_elem) => {
    obj[tool__obj_elem.key] = false;
    return obj;
  },
  {}
);

const Comp_explorer_tool = () => {
  /**
   * State
   */
  const [state__is_click__obj_tool_elems, set_state__is_click__obj_tool_elems] =
    useState(init_state__bool__obj_tool_elems);

  const [
    state__mouse_down__obj_tool_icons,
    set_state__mouse_down__obj_tool_icons,
  ] = useState(init_state__bool__obj_tool_elems);

  /**
   * Setter
   */
  const fn_setter__tool_to_click_state = (e_curr_tg_name) =>
    set_state__is_click__obj_tool_elems({
      ...state__is_click__obj_tool_elems,
      [e_curr_tg_name]: true,
    });

  const fn_setter__tool_to_non_click_state = () =>
    set_state__is_click__obj_tool_elems(init_state__bool__obj_tool_elems);

  const fn_setter__tool_to_mouse_down_state = (e_curr_tg_name) =>
    set_state__mouse_down__obj_tool_icons({
      ...state__mouse_down__obj_tool_icons,
      [e_curr_tg_name]: true,
    });

  const fn_setter__tool_to_non_mouse_down_state = () =>
    set_state__mouse_down__obj_tool_icons(init_state__bool__obj_tool_elems);

  /**
   * Side
   */
  const fn_side__update__click_tool_elem = () => {
    const arr_tool_attr_entries = Object.entries(
      state__is_click__obj_tool_elems
    );

    for (const [key, value] of arr_tool_attr_entries) {
      if (value !== true) continue;
      refs_of_key__obj_tool_elems[key].current.focus();
      fn_setter__tool_to_non_click_state();
      fn_setter__tool_to_non_mouse_down_state();
    }
  };

  useEffect(fn_side__update__click_tool_elem, [
    state__is_click__obj_tool_elems,
  ]);

  /**
   * Handler
   */
  const fn_handler__click__tool_elem = (e) => {
    const e_curr_tg_name = e.currentTarget.getAttribute("name");
    fn_setter__tool_to_click_state(e_curr_tg_name);
  };

  const fn_handler__mouse_down__tool_elem = (e) => {
    const e_curr_tg_name = e.currentTarget.getAttribute("name");
    fn_setter__tool_to_mouse_down_state(e_curr_tg_name);
  };

  return (
    <div className="comp_explorer_tool box">
      <ul className="a-row ul-no-space">
        <>
          {tool_attrs__arr_elems.map((obj_tool_elem) => {
            const { key, func, icon } = obj_tool_elem;
            return (
              <li
                key={key}
                className={`col ${func} li-no-style`}
                name={key}
                onClick={(e) => fn_handler__click__tool_elem(e)}
                onMouseDown={(e) => fn_handler__mouse_down__tool_elem(e)}
              >
                <i
                  className={`icon ${icon}${
                    state__mouse_down__obj_tool_icons[key]
                      ? " state__mouse_down"
                      : ""
                  }`}
                />
              </li>
            );
          })}
        </>
      </ul>
    </div>
  );
};

export default Comp_explorer_tool;
