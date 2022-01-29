import { useState, useEffect } from "react";

import "../../../styles/main/r__id__doc/editor.scss";
import { fn_POST__add_doc_elem } from "../../../logic/rest";

/**
 * TODO:
 *  -줄바꿈에 의해 에디터 높이 크기를 변경 (O)
 *  -버튼이나 'Ctrl+Enter'을 누르면 서버에 요청 후 요소 생성 (O)
 *  -CSS (버튼 클릭) (O)
 *  -textarea 컴포넌트 분리
 */

// Init value
const init_state__obj_is_key_down = {
  k_13: false,
  k_17: false,
};

const ElemEditor = ({ state__str_elem_type, fn_setter__close_editor }) => {
  /**
   * Local State
   */
  const [state__is_mouse_down, set_state__is_mouse_down] = useState(false);
  const [state__obj_is_key_down, set_state__obj_is_key_down] = useState(
    init_state__obj_is_key_down
  );
  const [state__str_txta_value, set_state__str_txta_value] = useState("");

  /**
   * Side
   */
  useEffect(() => {
    if (state__obj_is_key_down.k_13 && state__obj_is_key_down.k_17) {
      set_state__obj_is_key_down(init_state__obj_is_key_down);
      fn_POST__add_doc_elem(state__str_elem_type, state__str_txta_value);
      fn_setter__close_editor();
    }
  }, [state__obj_is_key_down]);

  /**
   * Handler
   */
  const fn_handler__on_submit__editor_form = (e) => {
    e.preventDefault();
    fn_POST__add_doc_elem(state__str_elem_type, state__str_txta_value);
    fn_setter__close_editor();
  };

  const fn_handler__on_key_down__editor_form = (e) => {
    if (e.keyCode === 13 || e.keyCode === 17) {
      set_state__obj_is_key_down({
        ...state__obj_is_key_down,
        [`k_${e.keyCode}`]: true,
      });

      const e_tg = e.target;
      const fn_handler__on_key_up__editor_form = (e2) => {
        set_state__obj_is_key_down({
          ...state__obj_is_key_down,
          [`k_${e.keyCode}`]: false,
        });
        e_tg.removeEventListener("keyup", fn_handler__on_key_up__editor_form);
      };
      e_tg.addEventListener("keyup", fn_handler__on_key_up__editor_form);
    }
  };

  const fn_handler__on_mouse_down__btn = (e) => {
    set_state__is_mouse_down(true);
    const e_curr_tg = e.currentTarget;

    const fn_handler__on_mouse_up__btn = () => {
      set_state__is_mouse_down(false);
      e_curr_tg.removeEventListener("mouseup", fn_handler__on_mouse_up__btn);
    };

    e_curr_tg.addEventListener("mouseup", fn_handler__on_mouse_up__btn);
  };

  const fn_handler__on_change__txta = (e) => {
    const e_curr_tg = e.currentTarget;
    e_curr_tg.style.height = "auto";
    e_curr_tg.style.height = `${e_curr_tg.scrollHeight + 8}px`;
    set_state__str_txta_value(e_curr_tg.value);
    console.log(state__str_txta_value);
  };

  /**
   * Component
   */
  return (
    <article
      className={`comp_editor ${
        state__str_elem_type ? "state__active" : undefined
      }`}
    >
      <form
        onSubmit={fn_handler__on_submit__editor_form}
        onKeyDown={fn_handler__on_key_down__editor_form}
      >
        <p>{`${state__str_elem_type} Editor - Ctrl+Enter | Click Button`}</p>
        <textarea
          placeholder="Input..."
          onChange={fn_handler__on_change__txta}
        ></textarea>
        <button
          type="submit"
          onMouseDown={fn_handler__on_mouse_down__btn}
          className={state__is_mouse_down ? "state__is_mouse_down" : undefined}
        >
          Save
        </button>
      </form>
    </article>
  );
};

export default ElemEditor;
