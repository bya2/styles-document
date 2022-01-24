import { useState } from "react";

import "../../../styles/main/r__id/activity_bar.scss";
import font_awesome from "../../../icon/font_awesome.json";

const arr_activity_items = [
  {
    alt: "activty_item__document",
    cls_icon: font_awesome.cls_icon__document,
  },
  {
    alt: "activty_item__search",
    cls_icon: font_awesome.cls_icon__search,
  },
  {
    alt: "activty_item__developer_info",
    cls_icon: font_awesome.cls_icon__developer,
  },
];

const obj_activity_items = arr_activity_items.reduce(
  (obj, t) => ((obj[t.alt] = false), obj),
  {}
);

const UserActivityBar = () => {
  // Local state
  const [state__is_mouse_down, set_state__is_mouse_down] =
    useState(obj_activity_items);

  // Handler
  const fn_handler__on_mouse_down__activity_item = (e) => {
    set_state__is_mouse_down({
      ...state__is_mouse_down,
      [e.currentTarget.getAttribute("name")]: true,
    });
  };

  const fn_handler__on_mouse_up__activity_item = (e) => {
    set_state__is_mouse_down(obj_activity_items);
    console.log(state__is_mouse_down);
  };

  return (
    <nav className="activity_bar">
      <>
        {arr_activity_items.map((obj_item) => (
          <div
            key={obj_item.alt}
            className={`icon_box ${
              state__is_mouse_down[obj_item.alt] && "state__mouse_down"
            }`}
            name={obj_item.alt}
            onMouseDown={fn_handler__on_mouse_down__activity_item}
            onMouseUp={fn_handler__on_mouse_up__activity_item}
          >
            <i
              className={obj_item.cls_icon}
              name={obj_item.alt}
              onMouseUp={(e) => {
                // e.stopPropagation();
              }}
            ></i>
          </div>
        ))}
      </>
    </nav>
  );
};

export default UserActivityBar;
