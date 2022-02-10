import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "../../../../../styles/main/aside/left/explorer/index.scss";

import Layer from "./layer";
import Tool from "./tool";

const Comp_explorer__left_aside = () => {
  console.log("comp_explorer__left_aside");

  /**
   * State
   */
  const [state__is_click__root, set_state__is_click__root] = useState(false);

  return (
    <div className="comp_explorer grid-box">
      <Tool />
      <hr />
      <nav
        className="layer_tree_root"
        tabIndex="0"
        onClick={() => set_state__is_click__root(true)}
        onBlur={() => set_state__is_click__root(false)}
      >
        <Layer state__is_click__root={state__is_click__root} />
      </nav>
    </div>
  );
};

export default Comp_explorer__left_aside;
