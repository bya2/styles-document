import { ExplorerContext } from "context/explorer";
import { useContext } from "react";

import CompRefInput from "components/reusable/_ref_input";
import CompExpLSubTree from "components/layout/main/explorer/layer/tree/sub";
import CompInputNode from "./input_node";

export default function CompExpLTree() {
  const {
    ctx__root_key,
    ctx__root_name,
    ctx__nodes__arr,
    ctx__state__cond__is_active__exp_l_nodes__obj,
    ctx__state__cond__is_click__exp_l_nodes__obj,
    ctx__cond__is_usr_exp_layer__bool,
    ctx__fn_handle__click__exp_any_layer,
  } = useContext(ExplorerContext);

  return (
    <div
      name={ctx__root_key}
      className={`comp exp-l-tree outer node root${
        ctx__state__cond__is_active__exp_l_nodes__obj[ctx__root_key] ? " s-active" : ""
      }${ctx__state__cond__is_click__exp_l_nodes__obj[ctx__root_key] ? " s-click" : ""}`}
      onClick={(e) => ctx__fn_handle__click__exp_any_layer(e)}
    >
      <span className="inner">
        <ul className="item-list">
          <>
            {ctx__state__cond__is_active__exp_l_nodes__obj[ctx__root_key] ||
            !Object.values(ctx__state__cond__is_active__exp_l_nodes__obj).includes(true) ? (
              <CompInputNode prop__node_id={null} prop__input_type={"folder"} prop__node_children={ctx__nodes__arr} />
            ) : null}

            {ctx__nodes__arr.map((node__obj) => {
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

            {ctx__state__cond__is_active__exp_l_nodes__obj[ctx__root_key] ||
            !Object.values(ctx__state__cond__is_active__exp_l_nodes__obj).includes(true) ? (
              <CompInputNode prop__node_id={null} prop__input_type={"document"} prop__node_children={ctx__nodes__arr} />
            ) : null}
          </>
        </ul>
      </span>
    </div>
  );
}
