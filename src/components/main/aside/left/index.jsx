import "../../../../styles/main/aside/left/index.scss";
import Tool from "./tool";
import Explorer from "./explorer";

const Comp_aside__left = () => {
  return (
    <aside className="left">
      <Tool />
      <hr />
      <Explorer />
    </aside>
  );
};

export default Comp_aside__left;
