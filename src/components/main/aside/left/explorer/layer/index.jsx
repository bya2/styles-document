import "../../../../../../styles/main/aside/left/explorer/layer/index.scss";

import React, { useState, useEffect } from "react";
import SubTree from "./sub_tree";
import Input from "../../../../../resusing/input";

const dummy_data__arr_doc_list = [
  {
    id: "213dsafa123",
    type: "document",
    name: "이진형의 문서1",
    parent: null,
    children: null, // arr
  },
  {
    id: "sdaffads132",
    type: "group",
    name: "이진형의 폴더1",
    parent: null,
    children: [
      {
        id: "213dsafa123dsfadsf",
        type: "group",
        name: "이진형의 폴더2",
        parent: "sdaffads132",
        children: [
          {
            id: "sdafadsf13114dfsasd",
            type: "document",
            name: "이진형의 문서2",
            parent: "213dsafa123dsfadsf",
            children: null,
          },
          {
            id: "sdafaddsfasf13114dfsasd",
            type: "document",
            name: "이진형의 문서2",
            parent: "213dsafa123dsfadsf",
            children: null,
          },
        ], // arr
      },
      {
        id: "sdafadsf13114sdafds",
        type: "document",
        name: "이진형의 문서2",
        parent: null,
        children: null,
      },
    ],
  },
  {
    id: "sdafadsf13114",
    type: "document",
    name: "이진형의 문서2",
    parent: null,
    children: null,
  },
];

const fn_recursion__obj_node_ids = (_obj, _children) => {
  _children.forEach((child) => {
    _obj[child.id] = false;
    if (child.children === null) return;
    fn_recursion__obj_node_ids(_obj, child.children);
  });
};

const init_state__obj_node_ids = dummy_data__arr_doc_list.reduce((obj, t) => {
  obj[t.id] = false;
  if (t.children === null) return obj;
  fn_recursion__obj_node_ids(obj, t.children);
  return obj;
}, {});

const fn_recursion__layer_sub_tree = (_obj_sub_tree_node) => {
  return (
    <SubTree key={_obj_sub_tree_node.id} obj_sub_tree_node={_obj_sub_tree_node}>
      {_obj_sub_tree_node.children !== null &&
      typeof _obj_sub_tree_node.children === "object" &&
      _obj_sub_tree_node.children.length !== 0 ? (
        <ul className="c_node_list range">
          {
            <>
              {_obj_sub_tree_node.children.map((obj_child_doc_elem) => {
                return fn_recursion__layer_sub_tree(obj_child_doc_elem);
              })}
            </>
          }
        </ul>
      ) : undefined}
    </SubTree>
  );
};

export const ref__input = React.createRef(null);

const Comp_explorer_layer_list = () => {
  console.log("Performance: comp_explorer_layer_list");

  console.log("INIT", init_state__obj_node_ids);

  /**
   * State
   */
  const [state__sub_tree_node_list, set_state__sub_tree_node_list] = useState(
    []
  );

  const [state__is_focus__obj_p_nodes, set_state__is_focus__obj_p_nodes] =
    useState({});
  const [state__is_fold__obj_groups, set_state__is_fold__obj_groups] = useState(
    {}
  );

  /**
   * Setter
   */

  /**
   * Side
   */
  useEffect(() => {}, []);

  /**
   * Handler
   */

  return (
    <ul className="comp_explorer_layer tree_child_list">
      <>
        <li className="sub_tree input_box">
          <Input
            className={"input"}
            type="text"
            placeholder={"dkfjas"}
            ref={ref__input}
            onChange={() => console.log(ref__input)}
          />
        </li>
        {state__sub_tree_node_list.map((sub_tree_node) => {
          return fn_recursion__layer_sub_tree(sub_tree_node);
        })}

        {dummy_data__arr_doc_list.map((sub_tree_node) => {
          return fn_recursion__layer_sub_tree(sub_tree_node);
        })}
      </>
    </ul>
  );
};

export default Comp_explorer_layer_list;
