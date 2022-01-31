import "../../../../../styles/main/aside/left/explorer/index.scss";

import GroupList from "./group_list";
import DocList from "./doc_list";

const Comp_explorer__left_aside = () => {
  console.log("comp_explorer__left_aside");
  return (
    <nav className="comp_explorer__left_aside">
      <ul>
        <GroupList>
          <DocList />
        </GroupList>
      </ul>
    </nav>
  );
};

export default Comp_explorer__left_aside;
