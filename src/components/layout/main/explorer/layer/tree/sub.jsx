import { ExplorerContext } from "context/explorer";
import { useContext } from "react";
import { Link } from "react-router-dom";
import CompRefInput from "components/reusable/_ref_input";
import CompInputNode from "./input_node";

function CompTreeNode({ prop__node_id, prop__node_type, prop__node_name }) {
  const {
    param__id,
    state__is_active__exp_l_tree_node__obj,
    state__is_fold__exp_l_tree_node__obj,
    state__is_click__exp_l_tree_node__obj,
    fn_handle__focus__exp_l_tree_node,
    fn_handle__click__exp_l_tree_node,
  } = useContext(ExplorerContext);

  const cond__is_folder__bool = prop__node_type === "folder";

  return (
    <div
      name={prop__node_id}
      className={`area node${state__is_click__exp_l_tree_node__obj[prop__node_id] ? " s-click" : ""}${
        state__is_active__exp_l_tree_node__obj[prop__node_id] ? " s-active" : ""
      }${!cond__is_folder__bool ? "" : state__is_fold__exp_l_tree_node__obj[prop__node_id] ? " s-fold" : ""}`}
      onFocus={(e) => fn_handle__focus__exp_l_tree_node(e, param__id)}
      onClick={(e) => fn_handle__click__exp_l_tree_node(e, param__id)}
      tabIndex="0"
    >
      <span className="group desc">
        {cond__is_folder__bool ? (
          <div className="icon-box fold">
            <i className={`icon ${1}`}>{">"}</i>
          </div>
        ) : null}
        {cond__is_folder__bool ? (
          <>
            <div className="icon-box type">
              <i className={`icon ${1}${state__is_fold__exp_l_tree_node__obj ? " s-fold" : ""}`}>
                {cond__is_folder__bool ? "F" : "D"}
              </i>
            </div>
            <div className="content-box">
              <span>{prop__node_name}</span>
            </div>
          </>
        ) : (
          <Link to={prop__node_name}>
            <div className="icon-box type">
              <i className={`icon ${1}${state__is_fold__exp_l_tree_node__obj ? " s-fold" : ""}`}>
                {cond__is_folder__bool ? "F" : "D"}
              </i>
            </div>
            <div className="content-box">
              <span>{prop__node_name}</span>
            </div>
          </Link>
        )}
      </span>
      <span className="group tool">
        <div className="icon-box">
          <i className={`icon ${1}`}>{"T"}</i>
        </div>
        <div className="content-box">
          <span>{"Delete"}</span>
        </div>
      </span>
    </div>
  );
}

function CompTreeChildren({ prop__node_id, prop__node_type, prop__node_children }) {
  const { state__is_active__exp_l_tree_node__obj, state__is_fold__exp_l_tree_node__obj } = useContext(ExplorerContext);

  const cond__is_folder__bool = prop__node_type === "folder";

  return (
    <div className={`area children${state__is_fold__exp_l_tree_node__obj[prop__node_id] ? " s-fold" : " s-unfold"}`}>
      <span className="group list">
        <ul className="item-list">
          <>
            {cond__is_folder__bool && state__is_active__exp_l_tree_node__obj[prop__node_id] ? (
              <CompInputNode
                prop__input_type={"folder"}
                prop__node_id={prop__node_id}
                prop__node_children={prop__node_children}
              />
            ) : null}

            {prop__node_children !== null
              ? prop__node_children.map((child_node__obj) => {
                  const { _id, type, name, parent, children } = child_node__obj;
                  const key = _id.toString();

                  return (
                    <li key={key} className="item">
                      <CompExpLSubTree
                        prop__node_id={key}
                        prop__node_type={type}
                        prop__node_name={name}
                        prop__node_parent_id={parent}
                        prop__node_children={children}
                      />
                    </li>
                  );
                })
              : null}

            {cond__is_folder__bool && state__is_active__exp_l_tree_node__obj[prop__node_id] ? (
              <CompInputNode
                prop__input_type={"document"}
                prop__node_id={prop__node_id}
                prop__node_children={prop__node_children}
              />
            ) : null}
          </>
        </ul>
      </span>
    </div>
  );
}

export default function CompExpLSubTree({
  prop__node_id,
  prop__node_type,
  prop__node_name,
  prop__node_parent_id,
  prop__node_children,
}) {
  return (
    <div className={"comp exp-l-sub-tree outer"}>
      <span className="inner">
        <CompTreeNode prop__node_id={prop__node_id} prop__node_type={prop__node_type} prop__node_name={prop__node_name} />
        <CompTreeChildren
          prop__node_id={prop__node_id}
          prop__node_type={prop__node_type}
          prop__node_name={prop__node_name}
          prop__node_parent_id={prop__node_parent_id}
          prop__node_children={prop__node_children}
        />
      </span>
    </div>
  );
}
