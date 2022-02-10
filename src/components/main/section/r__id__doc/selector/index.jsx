import "../../../../../styles/main/section/r__id__doc/selector/index.scss";
import { useState } from "react";
import cls_list__fas_icon from "../../../../../icon/font_awesome";
import Editor from "../editor";

const types__arr_elems = [
  {
    alt: "type__palette",
    name: "palette",
    icon: cls_list__fas_icon.cls__icon_palette,
  },
  {
    alt: "type__typography",
    name: "typography",
    icon: cls_list__fas_icon.cls__icon_typography,
  },
  {
    alt: "type__markdown",
    name: "markdown",
    icon: cls_list__fas_icon.cls__icon_markdown,
  },
];

const init_state__bool__obj_types = types__arr_elems.reduce((obj, obj_type) => {
  obj[obj_type.name] = false;
  return obj;
}, {});

const Comp_doc_selector = () => {
  /**
   * State
   */
  const [state__is_click__obj_type_names, set_state__is_click__obj_type_names] =
    useState(init_state__bool__obj_types);

  /**
   * Setter
   */
  const fn_setter__toggle__type_to_click_state = (e_curr_tg_name) => {
    set_state__is_click__obj_type_names({
      ...state__is_click__obj_type_names,
      [e_curr_tg_name]: state__is_click__obj_type_names[e_curr_tg_name]
        ? false
        : true,
    });
  };

  /**
   * Handler
   */
  const fn_handler__click__icon_box = (e) => {
    const e_curr_tg_name = e.currentTarget.getAttribute("name");
    fn_setter__toggle__type_to_click_state(e_curr_tg_name);
  };

  return (
    <>
      <article className="comp_doc_selector">
        <div className="box">
          <ul className="a-row flex-box ul-no-space">
            <>
              {types__arr_elems.map((obj_type) => {
                const { alt, name, icon } = obj_type;
                return (
                  <li
                    key={alt}
                    name={name}
                    className="col group li-no-style"
                    onClick={(e) => fn_handler__click__icon_box(e)}
                  >
                    <i className={`icon ${icon}`} />
                    <span className="tooltip no-display">{name}</span>
                  </li>
                );
              })}
            </>
          </ul>
        </div>
      </article>
      <Editor
        state__is_click__obj_type_names={state__is_click__obj_type_names}
      />
    </>
  );
};

export default Comp_doc_selector;
