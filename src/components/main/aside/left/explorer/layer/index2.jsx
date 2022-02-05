import { useEffect, useState } from "react";

import { fn_logic__GET__exp__node_list } from "../../../../../../logic/api/get";

const dummy_data__node_list = [
  {
    id: "doc_213dsafa123",
    type: "document",
    name: "이진형의 문서1",
    parent: null,
    children: null, // arr
  },
  {
    id: "group_sdaffads132",
    type: "group",
    name: "이진형의 폴더1",
    parent: null,
    children: ["group_213dsafa123dsfadsf", "group_000fadsf13114sdafds"],
  },
  {
    id: "doc_sdafadsf13114",
    type: "document",
    name: "이진형의 문서2",
    parent: null,
    children: null,
  },
  {
    id: "group_213dsafa123dsfadsf",
    type: "group",
    name: "이진형의 폴더2",
    parent: "group_sdaffads132",
    children: ["doc_sdafadsf13114dfsasd", "doc_dafaddsfasf13114dfsasd"],
  },
  {
    id: "group_000fadsf13114sdafds",
    type: "group",
    name: "이진형의 폴더3",
    parent: "group_sdaffads132",
    children: ["doc_sda3114dfsasd", "group_1234fsdafsasd"],
  },
  {
    id: "doc_sdafadsf13114dfsasd",
    type: "document",
    name: "이진형의 문서2",
    parent: "group_213dsafa123dsfadsf",
    children: null,
  },
  {
    id: "doc_dafaddsfasf13114dfsasd",
    type: "document",
    name: "이진형의 문서2",
    parent: "group_213dsafa123dsfadsf",
    children: null,
  },
  {
    id: "doc_sda3114dfsasd",
    type: "document",
    name: "이진형의 문서6",
    parent: "group_000fadsf13114sdafds",
    children: null,
  },
  {
    id: "group_1234fsdafsasd",
    type: "group",
    name: "이진형의 폴더4",
    parent: "group_000fadsf13114sdafds",
    children: [],
  },
];

const Comp_explorer_layer = () => {
  console.log("P: explorer_layer");

  /**
   * State
   */
  const [state__arr_nodes, set_state__arr_nodes] = useState(null);
  const [init_bool_state__obj_node_ids, set_init_bool_state__obj_node_ids] =
    useState(null);
  const [state__arr_sub_trees, set_state__arr_sub_trees] = useState(null);
  const [state__is_click__obj_node_ids, set_state__is_click__obj_node_ids] =
    useState(init_bool_state__obj_node_ids);
  const [state__is_active__obj_node_ids, set_state__is_active__obj_node_ids] =
    useState(init_bool_state__obj_node_ids);

  /**
   * Side
   */
  useEffect(() => {
    fn_logic__GET__exp__node_list()
      .then((data) => {
        if (data === undefined || data === null || data.length === 0) {
          set_state__arr_nodes(dummy_data__node_list);
          return;
        }
        set_state__arr_nodes(data);
      })
      .catch((err) => {
        console.error(
          `ERR:\nlocation: /src/components/main/aside/left/explorer/layer/index.jsx\n${err}`
        );
      });
  }, []);

  /**
   * 방법1:
   * 1. state__arr_node_list에서 parent가 null인 객체를 찾는다. return [];
   * 2. []을 순회하며 group 타입 중 children이 있는 객체가 있으면, 해당 객체의 id에 해당하는 parent_id를 가지고 있는 객체를 찾는다. return [];
   * 3. 이를 반복한다. return 재귀
   * 4. 리프 노드에 이르러서 type이 모두 document고, children이 null이면, 최상위 배열을 state__arr_sub_tree_list에 저장한다.
   *
   * 방법2:
   * 1. {부모 노드의 ID를 키: 해당 노드 객체 값}으로 가지는 배열로 이루어진 객체를 생성한다. return {};
   * 2. 빈 배열을 생성하고, 처음에 ROOT 키를 가지는 노드 배열을 이름에 따라 정렬 및 푸쉬.
   * 3. 각 노드의 ID에 해당하는 부모 노드 ID 값을 키로 가지는 배열을 각 노드의 children 프로퍼티에 푸쉬.
   * 4. 위 과정을 반복
   */
  useEffect(() => {
    if (state__arr_nodes === null) return;

    const obj_node_id_children = state__arr_nodes.reduce((obj, obj_node) => {
      const key__str_p_id = obj_node.parent || "root";
      if (!obj[key__str_p_id]) obj[key__str_p_id] = [];
      obj[key__str_p_id] = [...obj[key__str_p_id], obj_node];
      return obj;
    }, {});
    console.log(obj_node_id_children);

    console.log(1);
    const fn_recursion = (_id = "root") => {
      console.log(_id);
      console.log(obj_node_id_children[_id]);
      const arr_node_children = [...obj_node_id_children[_id]];
      // arr_node_children.sort((prev_obj, next_obj) =>
      //   prev_obj.id > next_obj.id ? 1 : next_obj > prev_obj ? -1 : 0
      // );
      for (const obj_child_node of arr_node_children) {
        obj_child_node.children = fn_recursion(obj_child_node.id);
        console.log(obj_child_node.id);
      }
      return arr_node_children;
    };
    console.log(2);
    console.log("3:", fn_recursion());
    // // set_state__arr_sub_trees(fn_recursion());
    // // console.log(state__arr_sub_trees);
    // set_init_bool_state__obj_node_ids(
    //   state__arr_nodes.reduce((obj, obj_node) => {
    //     obj[obj_node.id] = false;
    //     return obj;
    //   }, {})
    // );
  }, [state__arr_nodes]);

  /**
   * Handler
   */

  return (
    <ul className="comp_explorer_layer">
      <>
        {state__arr_nodes !== null &&
          state__arr_nodes.map((obj_node) => {
            // console.log(obj_node);
          })}
      </>
    </ul>
  );
};

export default Comp_explorer_layer;
