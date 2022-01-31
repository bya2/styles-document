import "../../../../styles/main/aside/left/index.scss";
import Tool from "./tool";
import Explorer from "./explorer";

import { useRef } from "react";

const Comp_aside__left = () => {
  const ref_input__add_group = useRef();
  const ref_input__add_doc = useRef();

  return (
    <aside className="left">
      <Tool
        ref_input__add_group={ref_input__add_group}
        ref_input__add_doc={ref_input__add_doc}
      />
      <hr />
      <Explorer />
    </aside>
  );
};

export default Comp_aside__left;
