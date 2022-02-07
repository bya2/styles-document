import { useState } from "react";
import "../../../../../styles/main/aside/left/explorer/index.scss";

import Layer from "./layer";

const Comp_explorer__left_aside = () => {
  console.log("comp_explorer__left_aside");

  /**
   * State
   */
  const [state__is_click__root, set_state__is_click__root] = useState(false);

  return (
    <nav
      className="comp_explorer__left_aside root"
      tabIndex="0"
      onClick={() => set_state__is_click__root(true)}
      onBlur={() => set_state__is_click__root(false)}
    >
      <Layer state__is_click__root={state__is_click__root} />
    </nav>
  );
};

export default Comp_explorer__left_aside;
