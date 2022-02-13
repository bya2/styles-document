import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import "../../../../../styles/main/section/r__id__doc/elements/index.scss";
import { fn_logic__GET__doc__elem_list } from "../../../../../logic/api/get";
import cls_list__fas_icon from "../../../../../icon/font_awesome";
import Palette from "./palette";
import Typography from "./typography";
import Markdown from "./markdown";
import Selector from "../selector";
import { useMemo } from "react";

const { cls__icon_filter, cls__icon_edit } = cls_list__fas_icon;

const Comp_doc_elements = () => {
  /**
   * Parameter
   */
  const obj_params = useParams();
  // const { id: param__id, doc: param__doc } = obj_params;

  /**
   * State
   */
  const [state__list__arr_elems, set_state__list__arr_elems] = useState([]);
  const [init_state__bool__obj_keys, set_init_state__bool__obj_keys] = useState(
    {}
  );
  const [
    state__is_click__obj_filter_keys,
    set_state__is_click__obj_filter_keys,
  ] = useState({});
  const [state__is_click__obj_edit_keys, set_state__is_click__obj_edit_keys] =
    useState({});

  /**
   * Setter
   */
  const fn_setter__cancel_mod = (key) =>
    set_state__is_click__obj_edit_keys({
      ...state__is_click__obj_edit_keys,
      [key]: false,
    });

  /**
   * Memo
   */
  const memo__updated_last_elem = useMemo(
    () => state__list__arr_elems.slice(-1)[0],
    [state__list__arr_elems]
  );

  /**
   * Sub
   */
  const fn_sub__comp__for_type = (_obj_elem) => {
    const { type, value: ta__str_value } = _obj_elem;

    switch (type) {
      case "palette":
        return <Palette ta__str_value={ta__str_value} />;
      case "typography":
        const { styles: typo__obj_styles } = _obj_elem;
        return (
          <Typography
            typo__obj_styles={typo__obj_styles}
            ta__str_value={ta__str_value}
          />
        );
      case "markdown":
        return <Markdown ta__str_value={ta__str_value} />;
      default:
        return null;
    }
  };

  /**
   * Side
   */
  const fn_side__mount__load_elems = () => {
    fn_logic__GET__doc__elem_list(obj_params)
      .then((obj_res_data) => {
        const { code, data } = obj_res_data;
        const { elements } = data;

        switch (code) {
          case 200:
            set_state__list__arr_elems(elements);
            break;
          case 404:
            set_state__list__arr_elems([]);
            break;
          default:
            set_state__list__arr_elems([]);
        }
      })
      .catch((err) => {
        console.log("ERR:\nLOC: fn_side__mount__load_elems");
        console.error(err);
        set_state__list__arr_elems([]);
      });
  };

  const fn_side__update__init_elem_keys = () => {
    if (
      !state__list__arr_elems instanceof Array ||
      state__list__arr_elems.length === 0
    )
      return;

    // code
    const len__obj_keys = Object.keys(init_state__bool__obj_keys).length;

    if (len__obj_keys === 0) {
      const bool__obj_keys = state__list__arr_elems.reduce((obj, obj_elem) => {
        obj[obj_elem._id] = false;
        return obj;
      }, {});
      set_init_state__bool__obj_keys(bool__obj_keys);
    } else {
      const obj_last_key = state__list__arr_elems.slice(-1)[0]._id.toString();

      // if (memo__updated_last_elem._id.toString() === obj_last_key) return;

      set_init_state__bool__obj_keys({
        ...init_state__bool__obj_keys,
        [obj_last_key]: false,
      });
    }
  };

  const fn_side__update__elem_keys = () => {
    const arr_all_keys = Object.keys(init_state__bool__obj_keys);

    if (arr_all_keys.lengh === 0 || !arr_all_keys instanceof Array) return;

    const arr_diff_keys = arr_all_keys.filter(
      (el) => !Object.keys(state__is_click__obj_filter_keys).includes(el)
    );
    const obj_diff_keys = arr_diff_keys.reduce((obj, str_key) => {
      obj[str_key] = false;
      return obj;
    }, {});

    set_state__is_click__obj_filter_keys({
      ...state__is_click__obj_filter_keys,
      ...obj_diff_keys,
    });

    set_state__is_click__obj_edit_keys({
      ...state__is_click__obj_edit_keys,
      ...obj_diff_keys,
    });
  };

  useEffect(fn_side__mount__load_elems, [obj_params]);
  useEffect(fn_side__update__init_elem_keys, [state__list__arr_elems]);
  useEffect(fn_side__update__elem_keys, [init_state__bool__obj_keys]);

  useEffect(() => {
    console.log(
      "DDDD",
      state__is_click__obj_edit_keys,
      state__is_click__obj_filter_keys
    );
  }, [state__is_click__obj_edit_keys, state__is_click__obj_filter_keys]);

  /**
   * Handler
   */
  const fn_handler__d_click__elem = (e) => {
    const e_curr_tg = e.currentTarget;
    const e_curr_tg_name = e_curr_tg.getAttribute("name");
  };

  const fn_handler__click__edit_icon = (e) => {
    const e_curr_tg_name = e.currentTarget.getAttribute("name");
    set_state__is_click__obj_edit_keys({
      ...state__is_click__obj_edit_keys,
      [e_curr_tg_name]: true,
    });
  };

  return (
    <>
      <ul className="comp_doc_elements a-col ul-no-space">
        <>
          {state__list__arr_elems.map((obj_elem, i) => {
            const { _id, type, value } = obj_elem;
            const key = _id.toString();
            return (
              <>
                {state__is_click__obj_edit_keys[key] ? (
                  <Selector
                    state__list__arr_elems={state__list__arr_elems}
                    set_state__list__arr_elems={set_state__list__arr_elems}
                    fn_setter__cancel_mod={fn_setter__cancel_mod}
                    prop__is_mod={true}
                    prop__curr_key={key}
                    prop__default_type={type}
                    prop__default_value={value}
                  />
                ) : (
                  <li
                    key={key}
                    className="row li-no-style"
                    name={`${type}${i}`}
                    onDoubleClick={(e) => fn_handler__d_click__elem(e)}
                  >
                    <div className="elem-header flex-box">
                      <div className="group flex-box">
                        <i
                          className={`icon filter-heading ${cls__icon_filter}`}
                          onClick={(e) => {}}
                        ></i>
                        <h2 className="elem-title">{type}</h2>
                      </div>
                      <div>
                        <i
                          className={`icon elem-edit ${cls__icon_edit}`}
                          name={key}
                          onClick={(e) => fn_handler__click__edit_icon(e)}
                        ></i>
                      </div>
                    </div>
                    <div className="sub-comp">
                      {fn_sub__comp__for_type(obj_elem)}
                    </div>
                  </li>
                )}
              </>
            );
          })}
        </>
      </ul>
      <Selector
        state__list__arr_elems={state__list__arr_elems}
        set_state__list__arr_elems={set_state__list__arr_elems}
      />
    </>
  );
};

export default Comp_doc_elements;
