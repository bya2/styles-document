import { ExplorerContext } from "context/explorer";
import { useContext } from "react";

import CompRefInput from "components/reusable/_ref_input";
import CompExpLSubTree from "components/layout/main/explorer/layer/tree/sub";

export default function CompExpLTree() {
  const { nodes__arr, cond__is_usr_exp_layer__bool, ref__n_doc_input, ref__n_fold_input } = useContext(ExplorerContext);
  return (
    <div className="comp exp-l-tree outer node root">
      <span className="inner">
        <ul className="item-list">
          <>
            {nodes__arr.map((node__obj) => {
              const { _id, type, name, parent, children } = node__obj;
              const key = _id.toString();
              const parent_id = parent?.toString();
              return (
                <li key={key} className="item">
                  <CompExpLSubTree
                    prop__node_id={key}
                    prop__node_type={type}
                    prop__node_name={name}
                    prop__node_parent_id={parent_id}
                    prop__node_children={children}
                  ></CompExpLSubTree>
                </li>
              );
            })}
            {
              // 조건:
              // NODE가 ACTIVE 상태일 것.
              // USER의 LAYER일 것.
              cond__is_usr_exp_layer__bool ? (
                <>
                  <li>
                    <CompRefInput type="text" placeholder={"new doc..."} ref={ref__n_doc_input} />
                  </li>
                  <li>
                    <CompRefInput type="text" placeholder={"new folder..."} ref={ref__n_fold_input} />
                  </li>
                </>
              ) : null
            }
          </>
        </ul>
      </span>
    </div>
  );
}
