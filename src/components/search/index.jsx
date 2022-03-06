import CompInput from "components/reusable/_input";
import { useState } from "react";

export default function CompSearch() {
  // Local State
  const [state__usr_input__str, set_state__usr_input__str] = useState("");

  // Event
  const fn_handle__change__usr_input = (e) => {
    const e_curr_tg = e.currentTarget;
    set_state__usr_input__str(e_curr_tg.value);
    console.log(state__usr_input__str);
  };

  return (
    <article className="comp search box">
      <form onSubmit={(e) => {}}>
        <div class="bar">
          <CompInput type="text" value={state__usr_input__str} onChange={(e) => fn_handle__change__usr_input(e)}></CompInput>
          <span>
            <i className="">D</i>
          </span>
        </div>
      </form>
    </article>
  );
}
