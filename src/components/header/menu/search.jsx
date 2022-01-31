import { useState } from "react";

import "../../../styles/header/menu/search.scss";
import obj_cls__fas_icon from "../../../icon/font_awesome";

import SearchList from "./search_list";

const { cls__icon_search } = obj_cls__fas_icon;

const str_placeholder__input = "Search or jump to...";

/**
 * TODO:
 * -- 키보드 입력 시 검색창에 포커스 (X)
 * --
 */
const Comp_menu__search = ({ state__is_click__search }) => {
  /**
   * State
   */
  const [state__str_search_query, set_state__str_search_query] = useState("");
  const [state__is_focus_input, set_state__is_focus_input] = useState(false);

  /**
   * Setter
   */
  const fn_setter__change_search_query = (e_curr_tg) =>
    set_state__str_search_query(e_curr_tg.value);

  const fn_setter__focus_search_input = (e_curr_tg) =>
    set_state__is_focus_input(true);

  const fn_setter__blur_search_input = () => set_state__is_focus_input(false);

  /**
   * Handler
   */
  const fn_handler__on_submit__form = (e) => {
    e.preventDefault();
    // REQ - GET: "/search
    // RES - SELECT * FROM 문서 WHERE 이름 LIKE '%문자열%'; (Array)
    // AFT - 문서로 이동, INPUT 포커스 해제
    // const fn_logic__GET__search = () => {};
  };

  const fn_handler__on_change__input_query = (e) => {
    const e_curr_tg = e.currentTarget;
    fn_setter__change_search_query(e_curr_tg);
  };

  const fn_handler__on_focus__input = (e) => {
    const e_curr_tg = e.currentTarget;
    fn_setter__focus_search_input(e_curr_tg);
  };

  const fn_handler__on_blur__input = (e) => {
    fn_setter__blur_search_input();
  };

  return (
    <span className="comp_menu_search__header">
      <form onSubmit={fn_handler__on_submit__form}>
        <fieldset
          className={`inner ${
            state__is_focus_input ? "state__focus" : undefined
          } ${state__is_click__search ? "state__click" : undefined}`}
        >
          <legend className="blind">검색</legend>
          <input
            type="text"
            id="s_query"
            name="s_query"
            placeholder={str_placeholder__input}
            title={"검색어 입력"}
            maxLength={255}
            autoFocus={true}
            autoComplete="off"
            className="input__txt"
            value={state__str_search_query}
            onChange={fn_handler__on_change__input_query}
            onFocus={fn_handler__on_focus__input}
            onBlur={fn_handler__on_blur__input}
          />

          <button type="submit" className="icon_btn">
            <i className={`icon ${cls__icon_search}`}></i>
          </button>
        </fieldset>
        <SearchList state__is_focus_input={state__is_focus_input} />
      </form>
    </span>
  );
};
export default Comp_menu__search;
