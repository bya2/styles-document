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
  const { cond__is_usr_exp_layer__bool, cond__is_click__exp_l_root__bool, ref__n_doc_input, ref__n_fold_input } =
    useContext(ExplorerContext);

  // Local State
  const [state__is_click_tool_item__obj, set_state__is_click_tool_item__obj] = useState(init_state__cond__obj);

  // Event
  const fn_handle__mouse_down__tool_item = (e) => {
    e.stopPropagation();
    const e_curr_tg = e.currentTarget;
    const e_curr_tg_name = e_curr_tg.getAttribute("name");

    e_curr_tg.addEventListener(
      "mouseup",
      () => {
        set_state__is_click_tool_item__obj({
          ...state__is_click_tool_item__obj,
          [e_curr_tg_name]: true,
        });

        switch (e_curr_tg_name) {
          case "new document":
            console.log(ref__n_doc_input);
            ref__n_doc_input.current.focus();
            break;
          case "new folder":
            ref__n_fold_input.current.focus();
            break;
          default:
        }
      },
      { once: true }
    );
    e.stopPropagation();
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
                    onMouseDown={(e) => fn_handle__mouse_down__tool_item(e)}
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
