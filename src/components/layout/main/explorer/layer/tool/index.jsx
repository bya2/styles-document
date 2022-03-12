import { useContext, useEffect, useState } from "react";

import { ExplorerContext } from "context/explorer";

const tool_items__arr = [
  {
    key: "exp_tool__new_doc",
    name: "new document",
    icon: "",
  },
  {
    key: "exp_tool__new_folder",
    name: "new folder",
    icon: "",
  },
  {
    key: "exp_tool__refresh",
    name: "refresh",
    icon: "",
  },
];

const init_state__cond__obj = tool_items__arr.reduce((obj, item__obj) => {
  obj[item__obj.name] = false;
  return obj;
}, {});

export default function CompExpTool() {
  // Context
  const {
    param__id,
    cond__is_usr_exp_layer__bool,
    cond__is_click__exp_l_root__bool,
    state__is_active__exp_l_tree_node__obj,
    ref__n_doc_input,
    ref__n_fold_input,
    fn_logic__fold__close_folder,
  } = useContext(ExplorerContext);

  // Local State
  const [state__is_click_tool_item__obj, set_state__is_click_tool_item__obj] = useState(init_state__cond__obj);

  // Side;
  useEffect(() => {
    let clicked;
    for (const [name, value] of Object.entries(state__is_click_tool_item__obj)) {
      if (value === true) {
        clicked = name;
      }
    }

    if (clicked === undefined) return;

    switch (clicked) {
      case "new document":
        ref__n_doc_input.current.focus();
        break;
      case "new folder":
        ref__n_fold_input.current.focus();
        break;
      default:
    }

    set_state__is_click_tool_item__obj({
      ...state__is_click_tool_item__obj,
      [clicked]: false,
    });
  }, [state__is_click_tool_item__obj]);

  // Event
  const fn_handle__mouse_down__tool_item = (e) => {
    const e_tg__curr = e.currentTarget;
    const e_tg_name__curr = e_tg__curr.getAttribute("name");

    e_tg__curr.addEventListener(
      "mouseup",
      () => {
        set_state__is_click_tool_item__obj({
          ...state__is_click_tool_item__obj,
          [e_tg_name__curr]: true,
        });

        const node_idx__actived = Object.values(state__is_active__exp_l_tree_node__obj).findIndex((el) => el === true);
        const node__actived = Object.keys(state__is_active__exp_l_tree_node__obj)[node_idx__actived];
        fn_logic__fold__close_folder(node__actived);
      },
      { once: true }
    );
  };

  return (
    <div className="comp exp-l-tool wrap">
      <ul className="item-list">
        <>
          {cond__is_click__exp_l_root__bool && cond__is_usr_exp_layer__bool
            ? tool_items__arr.map((tool_item__obj) => {
                const { key, name, icon } = tool_item__obj;
                return (
                  <li
                    key={key}
                    name={name}
                    className="item"
                    onMouseDown={(e) => {
                      e.stopPropagation();
                      fn_handle__mouse_down__tool_item(e);
                    }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <span className="item-inner">
                      <div className="icon-box">
                        <i className={`icon ${icon}`}>{"T"}</i>
                      </div>
                      <div className="content-box">
                        <span>{name}</span>
                      </div>
                    </span>
                  </li>
                );
              })
            : null}
        </>
      </ul>
    </div>
  );
}
