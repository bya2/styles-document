import "styles/search.scss";

import { useState } from "react";

import CompInput from "components/reusable/_input";
import CompList from "./items";

const search_items__arr = [
  { key: "i1", value: "A" },
  { key: "i2", value: "B" },
  { key: "i3", value: "C" },
  { key: "i4", value: "D" },
  { key: "i5", value: "E" },
  { key: "i6", value: "F" },
  { key: "i7", value: "G" },
];

export default function CompSearch() {
  // Local State
  const [state__usr_input__str, set_state__usr_input__str] = useState("");
  const [state__is_focus__bool, set_state__is_focus__bool] = useState(false);

  // Event
  const fn_handle__change__usr_input = (e) => {
    const e_curr_tg = e.currentTarget;
    set_state__usr_input__str(e_curr_tg.value);
  };

  const fn_handle__focus__usr_input = (e) => {
    set_state__is_focus__bool(true);
  };

  const fn_handle__blur__usr_input = (e) => {
    set_state__is_focus__bool(false);
  };

  return (
    <article className="comp search box">
      <form onBlur={(e) => fn_handle__blur__usr_input(e)}>
        <div className={`wrap-bar${state__is_focus__bool ? " s-focus" : ""}`}>
          <div class="bar">
            <span class="icon-box search">
              <i className={`icon`}>E</i>
            </span>
            <CompInput
              className="search-input"
              type="text"
              placeholder={"Inputs..."}
              value={state__usr_input__str}
              autoFocus={true}
              onChange={(e) => fn_handle__change__usr_input(e)}
              onFocus={(e) => fn_handle__focus__usr_input(e)}
            ></CompInput>
            <span class="icon-box tool">
              <i className={`icon`}>T</i>
            </span>
          </div>
          {state__is_focus__bool ? <CompList prop__search_items__arr={search_items__arr} /> : undefined}
        </div>
      </form>
    </article>
  );
}
