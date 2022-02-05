import "../../../../../../styles/main/aside/left/explorer/layer/index.scss";

import React, { useState, useEffect } from "react";
import SubTree from "./sub_tree";
import Input from "../../../../../resusing/input";

const dummy_data__arr_sub_tree_node_list = [
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
    children: [
      {
        id: "group_213dsafa123dsfadsf",
        type: "group",
        name: "이진형의 폴더2",
        parent: "group_sdaffads132",
        children: [
          {
            id: "doc_sdafadsf13114dfsasd",
            type: "document",
            name: "이진형의 문서2",
            parent: "213dsafa123dsfadsf",
            children: null,
          },
          {
            id: "doc_dafaddsfasf13114dfsasd",
            type: "document",
            name: "이진형의 문서2",
            parent: "213dsafa123dsfadsf",
            children: null,
          },
        ], // arr
      },
      {
        id: "group_000fadsf13114sdafds",
        type: "group",
        name: "이진형의 폴더3",
        parent: "group_sdaffads132",
        children: [
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
        ],
      },
    ],
  },
  {
    id: "doc_sdafadsf13114",
    type: "document",
    name: "이진형의 문서2",
    parent: null,
    children: null,
  },
];

const dummy_data__arr_sub_tree_node_list2 = [
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
const fn_recursion__obj_node_ids = (_obj, _children, _type = null) => {
  _children.forEach((child) => {
    if (_type !== null && _type === "group" && child.type !== _type) return;
    if (_type === null || _type === child.type) _obj[child.id] = false;
    if (child.children === null || child.children.lenght === 0) return;
    fn_recursion__obj_node_ids(_obj, child.children, _type);
  });
};

const init_state__obj_node_ids = (_arr_sub_tree_node_list, _type = null) =>
  _arr_sub_tree_node_list.reduce((obj, t) => {
    // 성능 최적화를 위한 필터링 (그룹 타입을 필요로할 때 문서 타입은 children이 없으므로 필요가 없음)
    if (_type !== null && _type === "group" && t.type !== _type) return obj;

    // 해당 타입이 맞는 경우에만 객체에 저장
    if (_type === null || _type === t.type) obj[t.id] = false;

    // 자식 노드가 없는 경우, 다음 노드로 이동
    if (t.children === null || t.children.length === 0) return obj;

    // 재귀 함수
    fn_recursion__obj_node_ids(obj, t.children, _type);
    return obj;
  }, {});

const fn_recursion__layer_sub_tree = (
  _obj_sub_tree_node,
  _state__is_click__obj_p_node_boxes,
  _state__is_active__obj_p_node_boxes,
  _state__is_fold_sub_tree__obj_p_group_nodes,
  _state__is_disabled__input,
  _fn_setter__click_p_node_box,
  _fn_setter__blur_p_node_box,
  _fn_setter__toggle_fold_sub_tree,
  _fn_handler__key_down__sub_tree_p_input_node
) => {
  return (
    <SubTree
      key={_obj_sub_tree_node.id}
      obj_sub_tree_node={_obj_sub_tree_node}
      state__is_click__obj_p_node_boxes={_state__is_click__obj_p_node_boxes}
      state__is_active__obj_p_node_boxes={_state__is_active__obj_p_node_boxes}
      state__is_fold_sub_tree__obj_p_group_nodes={
        _state__is_fold_sub_tree__obj_p_group_nodes
      }
      fn_setter__click_p_node_box={_fn_setter__click_p_node_box}
      fn_setter__blur_p_node_box={_fn_setter__blur_p_node_box}
      fn_setter__toggle_fold_sub_tree={_fn_setter__toggle_fold_sub_tree}
    >
      <ul className="c_node_list range">
        {_state__is_active__obj_p_node_boxes[_obj_sub_tree_node.id] ? (
          <li className="box p_node input ">
            <i className="icon">a</i>
            <Input
              className="name"
              name="bane"
              type="text"
              placeholder={"Input..."}
              disabled={_state__is_disabled__input}
              ref={ref__input}
              onChange={() => console.log(ref__input)}
              onKeyDown={_fn_handler__key_down__sub_tree_p_input_node}
              onBlur={null}
            />
          </li>
        ) : undefined}
        {_obj_sub_tree_node.children !== null &&
        typeof _obj_sub_tree_node.children === "object" &&
        _obj_sub_tree_node.children.length !== 0 ? (
          <>
            {
              <>
                {_obj_sub_tree_node.children.map((obj_child_doc_elem) => {
                  return fn_recursion__layer_sub_tree(
                    obj_child_doc_elem,
                    _state__is_click__obj_p_node_boxes,
                    _state__is_active__obj_p_node_boxes,
                    _state__is_fold_sub_tree__obj_p_group_nodes,
                    _state__is_disabled__input,
                    _fn_setter__click_p_node_box,
                    _fn_setter__blur_p_node_box,
                    _fn_setter__toggle_fold_sub_tree,
                    _fn_handler__key_down__sub_tree_p_input_node
                  );
                })}
              </>
            }
          </>
        ) : undefined}
      </ul>
    </SubTree>
  );
};

export const ref__input = React.createRef(null);

const Comp_explorer_layer_list = () => {
  console.log("Performance: comp_explorer_layer_list");
  /**
   * State
   */
  // 요청으로 불러오고 나타낼 데이터
  // const [state__sub_tree_node_list, set_state__sub_tree_node_list] = useState(
  //   []
  // );

  // const [state__obj_node_ids, set_state__obj_node_ids] = useState(null);
  // const [state__obj_group_node_ids, set_state__obj_group_node_ids] =
  //   useState(null);

  // 클릭한 서브 트리의 메인(부모) 노드
  const [
    state__is_click__obj_p_node_boxes,
    set_state__is_click__obj_p_node_boxes,
  ] = useState({});

  // 활성화한 서브 트리의 메인(부모) 노드
  // INPUT 컴포넌트의 위치인 메인 노드
  const [
    state__is_active__obj_p_node_boxes,
    set_state__is_active__obj_p_node_boxes,
  ] = useState({});

  // 폴드된 서브 트리 (부모 노드 아이디 기준)
  const [
    state__is_fold_sub_tree__obj_p_group_nodes,
    set_state__is_fold_sub_tree__obj_p_group_nodes,
  ] = useState({});

  const [state__is_display__input_box, set_state__is_display__input_box] =
    useState(false);

  const [state__is_disabled__input, set_state__is_disabled__input] =
    useState(false);

  /**
   * Setter
   */
  const fn_setter__click_p_node_box = (e_curr_tg_name) => {
    set_state__is_active__obj_p_node_boxes({
      ...init_state__obj_node_ids(dummy_data__arr_sub_tree_node_list),
      [e_curr_tg_name]: true,
    });
    set_state__is_click__obj_p_node_boxes({
      ...init_state__obj_node_ids(dummy_data__arr_sub_tree_node_list),
      [e_curr_tg_name]: true,
    });
  };

  const fn_setter__blur_p_node_box = (e_curr_tg_name) => {
    set_state__is_click__obj_p_node_boxes({
      ...init_state__obj_node_ids(dummy_data__arr_sub_tree_node_list),
      [e_curr_tg_name]: false,
    });
  };

  const fn_setter__toggle_fold_sub_tree = (e_curr_tg_name) => {
    set_state__is_fold_sub_tree__obj_p_group_nodes({
      ...state__is_fold_sub_tree__obj_p_group_nodes,
      [e_curr_tg_name]: state__is_fold_sub_tree__obj_p_group_nodes[
        e_curr_tg_name
      ]
        ? false
        : true,
    });
  };

  /**
   * Memo
   */

  /**
   * Callback
   */

  /**
   * Side
   */
  useEffect(() => {
    set_state__is_click__obj_p_node_boxes(
      init_state__obj_node_ids(dummy_data__arr_sub_tree_node_list)
    );

    set_state__is_active__obj_p_node_boxes(
      init_state__obj_node_ids(dummy_data__arr_sub_tree_node_list)
    );

    set_state__is_fold_sub_tree__obj_p_group_nodes(
      init_state__obj_node_ids(dummy_data__arr_sub_tree_node_list, "group")
    );

    // set_state__obj_node_ids(
    //   init_state__obj_node_ids(dummy_data__arr_sub_tree_node_list)
    // );
    // set_state__obj_group_node_ids(
    //   init_state__obj_node_ids(dummy_data__arr_sub_tree_node_list, "group")
    // );
  }, []);

  useEffect(() => {
    console.log(state__is_fold_sub_tree__obj_p_group_nodes);
  }, [state__is_fold_sub_tree__obj_p_group_nodes]);

  /**
   * Handler and Function
   */
  const fn_inner_handler__sub_tree_p_input_node = () => {
    set_state__is_disabled__input(true);
    ref__input.current.value = "";
    set_state__is_disabled__input(false);
  };

  const fn_handler__key_down__sub_tree_p_input_node = (e) => {
    if (e.keyCode !== 13) return;
    if (ref__input.current.value === "") {
      console.log("No name.");
      return;
    }
    fn_inner_handler__sub_tree_p_input_node();
  };

  const fn_handler__blur__sub_tree_p_input_node = (e) => {
    if (ref__input.current.value === "") return;
    fn_inner_handler__sub_tree_p_input_node();
  };

  return (
    <ul
      className="comp_explorer_layer tree_child_list"
      onClick={(e) => {
        const e_tg = e.target;
        console.log(e_tg.children);
      }}
      tabIndex="0"
    >
      <>
        {/* {state__sub_tree_node_list.map((sub_tree_node) => {
          return fn_recursion__layer_sub_tree(sub_tree_node);
        })} */}

        {dummy_data__arr_sub_tree_node_list.map((sub_tree_node) => {
          return fn_recursion__layer_sub_tree(
            sub_tree_node,
            state__is_click__obj_p_node_boxes,
            state__is_active__obj_p_node_boxes,
            state__is_fold_sub_tree__obj_p_group_nodes,
            state__is_disabled__input,
            fn_setter__click_p_node_box,
            fn_setter__blur_p_node_box,
            fn_setter__toggle_fold_sub_tree,
            fn_handler__key_down__sub_tree_p_input_node
          );
        })}

        {Object.values(state__is_active__obj_p_node_boxes).includes(
          true
        ) ? undefined : (
          <li className="box p_node input ">
            <i className="icon">a</i>
            <Input
              className="name"
              name="bane"
              type="text"
              placeholder={"Input..."}
              disabled={state__is_disabled__input}
              ref={ref__input}
              onChange={() => console.log(ref__input)}
              onKeyDown={fn_handler__key_down__sub_tree_p_input_node}
              onBlur={null}
            />
          </li>
        )}
      </>
    </ul>
  );
};

export default Comp_explorer_layer_list;
