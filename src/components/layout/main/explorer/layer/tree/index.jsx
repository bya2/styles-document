import { ExplorerContext } from "context/explorer";
import { useContext } from "react";

import CompRefInput from "components/reusable/_ref_input";
import CompExpLSubTree from "components/layout/main/explorer/layer/tree/sub";
import CompInputNode from "./input_node";

export default function CompExpLTree() {
  const {
    layer__key,
    param__id,
    nodes__arr,
    state__is_active__exp_l_tree_node__obj,
    state__is_click__exp_l_tree_node__obj,
    cond__is_usr_exp_layer__bool,
    fn_handle__click__exp_any_layer,
  } = useContext(ExplorerContext);

  return (
    <div
      name={layer__key}
      className={`comp exp-l-tree outer node root${state__is_active__exp_l_tree_node__obj[layer__key] ? " s-active" : ""}${
        state__is_click__exp_l_tree_node__obj[layer__key] ? " s-click" : ""
      }`}
      onClick={(e) => fn_handle__click__exp_any_layer(e)}
    >
      <span className="inner">
        <ul className="item-list">
          <>
            {state__is_active__exp_l_tree_node__obj[layer__key] ? (
              <CompInputNode prop__node_id={null} prop__input_type={"folder"} prop__node_children={nodes__arr} />
            ) : null}

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

            {state__is_active__exp_l_tree_node__obj[layer__key] ? (
              <CompInputNode prop__node_id={null} prop__input_type={"document"} prop__node_children={nodes__arr} />
            ) : null}
          </>
        </ul>
      </span>
    </div>
  );
}
