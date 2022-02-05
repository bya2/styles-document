import "../../../../../styles/main/aside/left/explorer/index.scss";

import Layer from "./layer";

import Layer2 from "./layer/index2";

const Comp_explorer__left_aside = () => {
  console.log("comp_explorer__left_aside");

  /**
   * Handler
   */
  const fn_handler__click__nav = (e) => {
    const e_curr_tg = e.currentTarget;
  };

  return (
    <nav
      className="comp_explorer__left_aside"
      tabIndex="0"
      onClick={fn_handler__click__nav}
    >
      {/* <Layer /> */}
      <Layer2 />
    </nav>
  );
};

export default Comp_explorer__left_aside;
