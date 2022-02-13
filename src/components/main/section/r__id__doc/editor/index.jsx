import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../../../../../styles/main/section/r__id__doc/editor/index.scss";
import { fn_logic__POST__doc__add_elem } from "../../../../../logic/api/post";
import { fn_logic__PATCH__doc__mod_elem } from "../../../../../logic/api/patch";
import TextArea from "../../../../resusing/textarea";
import { useMemo } from "react";

const init_state__bool__obj_keys = {
  13: false,
  17: false,
};

const Comp_doc_editor = ({
  state__is_click__obj_type_names,
  fn_setter__init__type_to_click_state,
  state__list__arr_elems,
  set_state__list__arr_elems,
  fn_setter__cancel_mod,
  prop__is_mod,
  prop__curr_key,
  prop__default_value,
}) => {
  /**
   * Parameters
   */
  const obj_params = useParams();
  const { id: param__id, doc: param__doc } = obj_params;

  /**
   * State
   */
  const [state__is_not_submit__form, set_state__is_not_submit__form] =
    useState(true);

  const [state__is_key_down__obj_keys, set_state__is_key_down__obj_keys] =
    useState(init_state__bool__obj_keys);

  const [state__content__str_txta_val, set_state__content__str_txta_val] =
    useState(prop__default_value || "");

  const [state__is_mouse_up__form_btn, set_state__is_mouse_up__form_btn] =
    useState(false);

  const [state__num_ta_rows, set_state__num_ta_rows] = useState(1);

  const [state__rownum__arr_nums, set_state__rownum__arr_nums] = useState([1]);

  const [state__cursor_line, set_state__cursor_line] = useState(0);

  /**
   * Setter
   */
  const fn_setter__key_down_state = (e_key_code) =>
    set_state__is_key_down__obj_keys({
      ...state__is_key_down__obj_keys,
      [`${e_key_code}`]: true,
    });

  const fn_setter__key_up_state = (e_key_code) =>
    set_state__is_key_down__obj_keys({
      ...state__is_key_down__obj_keys,
      [`${e_key_code}`]: false,
    });

  const fn_setter__mouse_up_state = () => {
    set_state__is_mouse_up__form_btn(true);
    setTimeout(() => set_state__is_mouse_up__form_btn(false), 100);
  };

  /**
   * Memo
   */
  const memo__str_selected_type = useMemo(
    () =>
      Object.keys(state__is_click__obj_type_names)[
        Object.values(state__is_click__obj_type_names).findIndex(
          (el) => el === true
        )
      ] || undefined,
    [state__is_click__obj_type_names]
  );

  /**
   * Logic
   */
  const fn_logic__add_elem = () => {
    set_state__is_not_submit__form(false);

    const obj_elem = {
      param__id,
      param__doc,
      ta__str_value: state__content__str_txta_val,
      type: memo__str_selected_type,
      styles: null || {},
    };

    fn_logic__POST__doc__add_elem(obj_elem)
      .then((obj_res_data) => {
        // code
        // -- setter
        const { code, message, data } = obj_res_data;
        const { element } = data;
        console.log("DATA:", state__list__arr_elems, obj_elem);

        set_state__list__arr_elems([...state__list__arr_elems, element]);
      })
      .catch((err) => {
        console.log("ERR:\nLOC: comp_editor-logic-fn_logic__add_elem");
        console.error(err);
      });

    // after
    setTimeout(() => {
      fn_setter__init__type_to_click_state();
      set_state__is_not_submit__form(true);
    }, 500);
  };

  const fn_logic__mod_elem = () => {
    set_state__is_not_submit__form(false);

    const obj_req_body = {
      id: prop__curr_key,
      writer: param__id,
      document: param__doc,
      value: state__content__str_txta_val,
      type: memo__str_selected_type,
      styles: null || {},
    };

    fn_logic__PATCH__doc__mod_elem(obj_req_body)
      .then((obj_res_data) => {
        console.log(1);
        const { code, message, data } = obj_res_data;
        const { element } = data;

        const idx__elem = state__list__arr_elems.findIndex((obj_elem, i) => {
          console.log(
            "_ID",
            obj_elem._id.toString(),
            element._id.toString(),
            i
          );
          return obj_elem._id.toString() === element._id.toString();
        });
        console.log("DIDI", state__list__arr_elems);
        console.log("IDX", idx__elem);

        const updated_state__list__arr_elems = [...state__list__arr_elems];
        updated_state__list__arr_elems.splice(idx__elem, 1, element);

        console.log(element);

        set_state__list__arr_elems(updated_state__list__arr_elems);
        console.log(element._id.toString());
        fn_setter__cancel_mod(element._id.toString());
      })
      .catch((err) => {
        console.log("ERR:\nLOC: comp_editor-logic-fn_logic__mod_elem");
        console.error(err);
      });

    // after
    setTimeout(() => {
      fn_setter__init__type_to_click_state();
      set_state__is_not_submit__form(true);
    }, 500);
  };

  /**
   * Side
   */
  const fn_side__chk_key_down__both_13_17 = () => {
    if (
      state__is_not_submit__form &&
      state__is_key_down__obj_keys["13"] &&
      state__is_key_down__obj_keys["17"]
    ) {
      // code
      console.log("submit(keydown)");

      if (prop__is_mod) {
        console.log(1112);
        fn_logic__mod_elem();
      } else {
        console.log(1113);
        fn_logic__add_elem();
      }
    }
  };

  useEffect(fn_side__chk_key_down__both_13_17, [state__is_key_down__obj_keys]);

  /**
   * Handler
   */
  const fn_handler__submit__form = (e) => {
    e.preventDefault();
    if (state__is_not_submit__form) {
      // code
      console.log("submit(click)");

      if (prop__is_mod) {
        fn_logic__mod_elem();
      } else {
        fn_logic__add_elem();
      }
    }
  };

  const fn_handler__key_down__form = (e) => {
    const e_key_code = e.keyCode;
    if (e_key_code === 13 || e_key_code === 17) {
      fn_setter__key_down_state(e_key_code);
    }
  };

  const fn_handler__key_up__form = (e) => {
    const e_key_code = e.keyCode;
    if (e_key_code === 13 || e_key_code === 17) {
      fn_setter__key_up_state(e_key_code);
    }
  };

  // scrollHeight: 스크롤을 포함한 높이
  // offsetHeight: 테두리를 포함한 높이
  // style.height: 높이
  // lineHeight: 줄 높이
  const fn_handler__change__txta = (e) => {
    const ta = e.currentTarget;
    const ta_style = window.getComputedStyle
      ? window.getComputedStyle(ta)
      : ta.style;

    const ta_line_h = parseInt(ta_style.lineHeight, 10);

    //

    const fn_calc__ta_height = (ta, ta_line_h) => {
      const ta_orgi_h = ta.style.height;
      let ta_h = ta.offsetHeight;
      const ta_scrl_h = ta.scrollHeight;
      // const ta_overflow = ta.style.overflow;

      if (ta_h >= ta_scrl_h) {
        ta.style.height = ta_h + ta_line_h + "px";
        ta.style.overflow = "hidden";

        if (ta_scrl_h < ta.scrollHeight) {
          while (ta.offsetHeight >= ta.scrollHeight) {
            ta.style.height = (ta_h -= ta_line_h) + "px";
          }

          while (ta.offsetHeight < ta.scrollHeight) {
            ta.style.height = ++ta_h + "px";
          }

          ta.style.height = ta_orgi_h;
          ta.style.overflow = "overflow";
          return ta_h;
        }
      } else {
        return ta_scrl_h;
      }
    };

    //

    const ta_h = fn_calc__ta_height(ta, ta_line_h);
    const n_of_lines = Math.ceil(ta_h / ta_line_h) - 1;
    console.log(n_of_lines);

    console.log(ta.selectedLine);
    set_state__num_ta_rows(n_of_lines);
    set_state__rownum__arr_nums(
      n_of_lines === state__rownum__arr_nums[state__rownum__arr_nums.length - 1]
        ? state__rownum__arr_nums
        : n_of_lines >
          state__rownum__arr_nums[state__rownum__arr_nums.length - 1]
        ? [...state__rownum__arr_nums, n_of_lines]
        : [
            ...state__rownum__arr_nums.slice(
              0,
              state__rownum__arr_nums.length - 1
            ),
          ]
    );
    set_state__content__str_txta_val(ta.value);
  };

  const fn_handler__mouse_up__form_btn = () => fn_setter__mouse_up_state();

  const fn_handler__click__ta_selection = (e) => {
    const node__ta = e.currentTarget;
    const { value: node__ta_value, selectionStart, selectionEnd } = node__ta;
    if (selectionStart === selectionEnd) {
      const lines__arr_values = node__ta_value
        .substr(0, selectionStart)
        .split("\n");
      const num__cursor_line = lines__arr_values.length;
      set_state__cursor_line(num__cursor_line);
    } else {
      set_state__cursor_line(null);
    }
    console.log(
      node__ta.selectionDirection,
      node__ta.selectionStart,
      node__ta.selectionEnd,
      node__ta.moveStart,
      node__ta.moveEnd,
      node__ta.offsetLeft,
      node__ta.offsetTop
    );
    e.stopPropagation();
  };

  return (
    <article className="comp_doc_editor">
      <div className="box">
        <div className="flex-box">
          <p className="msg p-no-margin">
            {"Editor - Ctrl+Enter | Click Button"}
          </p>
          <p className="type p-no-margin">{`[${memo__str_selected_type}]`}</p>
        </div>
        <form
          className="flex-box"
          onSubmit={(e) => fn_handler__submit__form(e)}
          onKeyDown={(e) => fn_handler__key_down__form(e)}
          onKeyUp={(e) => fn_handler__key_up__form(e)}
        >
          <div className="a-row">
            <div className="rownum col">
              <>
                {state__rownum__arr_nums.map((num) => {
                  return <div key={num}>{num}</div>;
                })}
              </>
            </div>
            <TextArea
              className="txta col"
              placeholder="Input..."
              rows={state__num_ta_rows}
              onChange={(e) => fn_handler__change__txta(e)}
              onClick={(e) => fn_handler__click__ta_selection(e)}
              onKeyDown={(e) => {}}
              defaultValue={prop__default_value}
            />
            <div
              className="line-select"
              style={{
                top:
                  state__cursor_line === 0
                    ? undefined
                    : state__cursor_line * 1.25 - 0.65 + "rem",
              }}
            ></div>
          </div>
          <button
            type="submit"
            className={
              state__is_mouse_up__form_btn ? "state__mouse_up" : undefined
            }
            name="editor_btn"
            onMouseUp={(e) => fn_handler__mouse_up__form_btn(e)}
          >
            save
          </button>
        </form>
      </div>
    </article>
  );
};

export default Comp_doc_editor;
