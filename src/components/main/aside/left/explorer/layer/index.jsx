import "../../../../../../styles/main/aside/left/explorer/layer/index.scss";
import { fn_logic__GET__exp__node_list } from "../../../../../../logic/api/get";
import {
  fn_logic__POST__exp__add_doc,
  fn_logic__POST__exp__add_group,
} from "../../../../../../logic/api/post";

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Input from "../../../../../resusing/input";
import SubTree from "./sub_tree";

export const ref__doc_input = React.createRef(null);
export const ref__grp_input = React.createRef(null);

const re_fn__sub_tree_layer = (
  _obj_sub_tree_node,
  _state__is_click__obj_p_node_boxes,
  _state__is_active__obj_p_node_boxes,
  _state__is_fold_sub_tree__obj_p_group_nodes,
  _state__is_disabled__input,
  _fn_setter__click_p_node_box,
  _fn_setter__blur_p_node_box,
  _fn_setter__toggle_fold_sub_tree,
  _fn_handler__key_down__sub_tree_p_input_node,
  _fn_handler__blur__sub_tree_p_input_node
) => {
  return (
    <SubTree
      key={_obj_sub_tree_node._id}
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
        {_state__is_active__obj_p_node_boxes[_obj_sub_tree_node._id] ? (
          <>
            <li className="box p_node input ">
              <i className="icon">d</i>
              <Input
                className="name"
                name="document"
                type="text"
                placeholder="doc..."
                disabled={_state__is_disabled__input}
                ref={ref__doc_input}
                onKeyDown={(e) =>
                  _fn_handler__key_down__sub_tree_p_input_node(
                    e,
                    _obj_sub_tree_node._id
                  )
                }
                onBlur={(e) =>
                  _fn_handler__blur__sub_tree_p_input_node(
                    e,
                    _obj_sub_tree_node._id
                  )
                }
              />
            </li>
            <li className="box p_node input ">
              <i className="icon">g</i>
              <Input
                className="name"
                name="group"
                type="text"
                placeholder="grp..."
                disabled={_state__is_disabled__input}
                ref={ref__grp_input}
                onKeyDown={(e) =>
                  _fn_handler__key_down__sub_tree_p_input_node(
                    e,
                    _obj_sub_tree_node._id
                  )
                }
                onBlur={(e) =>
                  _fn_handler__key_down__sub_tree_p_input_node(
                    e,
                    _obj_sub_tree_node._id
                  )
                }
              />
            </li>
          </>
        ) : undefined}
        {_obj_sub_tree_node.children !== null &&
        typeof _obj_sub_tree_node.children === "object" &&
        _obj_sub_tree_node.children.length !== 0 ? (
          <>
            {
              <>
                {_obj_sub_tree_node.children.map((obj_child_doc_elem) => {
                  return re_fn__sub_tree_layer(
                    obj_child_doc_elem,
                    _state__is_click__obj_p_node_boxes,
                    _state__is_active__obj_p_node_boxes,
                    _state__is_fold_sub_tree__obj_p_group_nodes,
                    _state__is_disabled__input,
                    _fn_setter__click_p_node_box,
                    _fn_setter__blur_p_node_box,
                    _fn_setter__toggle_fold_sub_tree,
                    _fn_handler__key_down__sub_tree_p_input_node,
                    _fn_handler__blur__sub_tree_p_input_node
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

const Comp_explorer_layer = ({ state__is_click__root }) => {
  console.log("P: explorer_layer");
  /**
   * Param
   */
  // const { id } = useParams();

  /**
   * State
   */
  const [state__arr_nodes, set_state__arr_nodes] = useState([]);
  const [init_bool_state__obj_node_ids, set_init_bool_state__obj_node_ids] =
    useState({});
  const [
    init_bool_state__obj_group_node_ids,
    set_init_bool_state__obj_group_node_ids,
  ] = useState({});
  const [state__arr_sub_trees, set_state__arr_sub_trees] = useState([]);

  // 클릭한 서브 트리의 메인(부모) 노드
  const [state__is_click__obj_node_ids, set_state__is_click__obj_node_ids] =
    useState(init_bool_state__obj_node_ids);

  // 활성화한 서브 트리의 메인(부모) 노드
  // INPUT 컴포넌트의 위치인 메인 노드
  const [state__is_active__obj_node_ids, set_state__is_active__obj_node_ids] =
    useState(init_bool_state__obj_node_ids);

  // 폴드된 서브 트리 (부모 노드 아이디 기준)
  const [
    state__is_fold_sub_tree__obj_p_group_nodes,
    set_state__is_fold_sub_tree__obj_p_group_nodes,
  ] = useState(init_bool_state__obj_group_node_ids);

  const [state__is_disabled__input, set_state__is_disabled__input] =
    useState(false);

  /**
   * Setter
   */
  const fn_setter__init_bool_state = () => {
    set_state__is_click__obj_node_ids(init_bool_state__obj_node_ids);
    set_state__is_active__obj_node_ids(init_bool_state__obj_node_ids);
    set_state__is_fold_sub_tree__obj_p_group_nodes(
      init_bool_state__obj_group_node_ids
    );
  };

  const fn_setter__click_p_node_box = (e_curr_tg_name) => {
    set_state__is_active__obj_node_ids({
      ...init_bool_state__obj_node_ids,
      [e_curr_tg_name]: true,
    });
    set_state__is_click__obj_node_ids({
      ...init_bool_state__obj_node_ids,
      [e_curr_tg_name]: true,
    });
  };

  const fn_setter__blur_p_node_box = (e_curr_tg_name) => {
    set_state__is_click__obj_node_ids({
      ...init_bool_state__obj_node_ids,
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
   * Side
   */
  // Mount
  useEffect(() => {
    fn_logic__GET__exp__node_list()
      .then(({ status, data }) => {
        set_state__arr_nodes(data || []);
      })
      .catch((err) => {
        console.error(
          `ERR:\nlocation: /src/components/main/aside/left/explorer/layer/index.jsx\n${err}`
        );
      });
  }, []);

  // Update(state__arr_nodes)
  useEffect(() => {
    if (state__arr_nodes === null || state__arr_nodes.length === 0) return;

    // 부모를 키로 가진 요소 배열로 이루어진 객체
    const obj_node_id_children = state__arr_nodes.reduce((obj, obj_node) => {
      const key__str_p_id = obj_node.parent || "root";
      if (!obj[key__str_p_id]) obj[key__str_p_id] = [];
      obj[key__str_p_id] = [...obj[key__str_p_id], obj_node];
      return obj;
    }, {});

    // 재귀 (내부에서 정렬 및 자식 요소를 찾음)
    const re_fn__arr_sub_trees = (_id = "root") => {
      const arr_node_children = [...obj_node_id_children[_id]];

      arr_node_children.sort((prev_obj, next_obj) =>
        prev_obj.name > next_obj.name
          ? 1
          : next_obj.name > prev_obj.name
          ? -1
          : 0
      );

      for (const obj_c_node of arr_node_children) {
        console.log("CID", obj_c_node._id);
        if (obj_c_node.type === "document" || obj_c_node.children.length === 0)
          continue;
        obj_c_node.children = re_fn__arr_sub_trees(obj_c_node._id);
      }
      return arr_node_children;
    };

    set_state__arr_sub_trees(re_fn__arr_sub_trees());

    // State의 초기 상태 생성
    const init_bool_state__obj_node_ids = (_type = null) => {
      return state__arr_nodes.reduce((obj, obj_node) => {
        if (_type === null || obj_node.type === _type) {
          obj[obj_node._id] = false;
        }
        return obj;
      }, {});
    };

    set_init_bool_state__obj_node_ids(init_bool_state__obj_node_ids);
    set_init_bool_state__obj_group_node_ids(
      init_bool_state__obj_node_ids("group")
    );
  }, [state__arr_nodes]);

  useEffect(() => {
    fn_setter__init_bool_state();
  }, [init_bool_state__obj_node_ids, init_bool_state__obj_group_node_ids]);

  /**
   * Handler
   */
  const fn_inner_handler__sub_tree_p_input_node = (_e_curr_tg, parent) => {
    const e_curr_tg_name = _e_curr_tg.getAttribute("name");
    const e_curr_tg_value = _e_curr_tg.value;

    set_state__is_disabled__input(true);

    const req_data__obj_params = {
      type: e_curr_tg_name,
      name: e_curr_tg_value,
      parent,
      writer: sessionStorage.getItem("id") || "bya2",
    };

    /* type name parent writer */
    if (e_curr_tg_name === "doc_input") {
      fn_logic__POST__exp__add_doc(req_data__obj_params)
        .then((obj_data) => {
          console.log("INPUT:", obj_data);
          // if (obj_data) {
          //   const idx__p_node = state__arr_nodes.findIndex(
          //     (obj_node) => obj_node._id === obj_data.parent
          //   );

          //   const tmp_arr = [...state__arr_nodes, obj_data].map(
          //     (obj_node, i) => {
          //       if (i === idx__p_node) {
          //         obj_node.children = [...obj_node.children, obj_data._id];
          //         console.log(obj_node.children);
          //       }
          //     }
          //   );

          //   set_state__arr_nodes(tmp_arr);
          // }
        })
        .catch((err) => {
          console.log(
            "comp_explorer_layer - fn_inner_handler__sub_tree_p_input_node"
          );
          console.error(err);
        });
    } else {
      fn_logic__POST__exp__add_group(req_data__obj_params)
        .then(() => {})
        .catch((err) => {
          console.log(
            "comp_explorer_layer - fn_inner_handler__sub_tree_p_input_node"
          );
          console.error(err);
        });
    }

    console.log("E_CURR:", e_curr_tg_name, e_curr_tg_value);
    _e_curr_tg.value = "";
    set_state__is_disabled__input(false);
  };

  const fn_handler__key_down__sub_tree_p_input_node = (e, parent = "root") => {
    if (e.keyCode !== 13) return;

    const e_curr_tg = e.currentTarget;
    if (e_curr_tg.value === "") {
      console.log("No name.");
      return;
    }
    fn_inner_handler__sub_tree_p_input_node(e_curr_tg, parent);
  };

  const fn_handler__blur__sub_tree_p_input_node = (e, parent = "root") => {
    console.log("blur");
    const e_curr_tg = e.currentTarget;
    if (e_curr_tg.value === "") return;

    fn_inner_handler__sub_tree_p_input_node(e_curr_tg, parent);
  };

  return (
    <ul className="comp_explorer_layer tree_child_list">
      <>
        {state__arr_nodes !== null &&
          state__arr_sub_trees !== null &&
          state__arr_sub_trees.map((sub_tree_node) => {
            return re_fn__sub_tree_layer(
              sub_tree_node,
              state__is_click__obj_node_ids,
              state__is_active__obj_node_ids,
              state__is_fold_sub_tree__obj_p_group_nodes,
              state__is_disabled__input,
              fn_setter__click_p_node_box,
              fn_setter__blur_p_node_box,
              fn_setter__toggle_fold_sub_tree,
              fn_handler__key_down__sub_tree_p_input_node,
              fn_handler__blur__sub_tree_p_input_node
            );
          })}
      </>

      {state__is_click__root ||
      (state__is_active__obj_node_ids &&
        !Object.values(state__is_active__obj_node_ids).includes(true)) ? (
        <>
          <li className="box p_node input ">
            <i className="icon">d</i>
            <Input
              className="name"
              name="document"
              type="text"
              placeholder={"doc..."}
              disabled={state__is_disabled__input}
              ref={ref__doc_input}
              onKeyDown={fn_handler__key_down__sub_tree_p_input_node}
              onBlur={fn_handler__blur__sub_tree_p_input_node}
            />
          </li>
          <li className="box p_node input ">
            <i className="icon">g</i>
            <Input
              className="name"
              name="group"
              type="text"
              placeholder={"grp..."}
              disabled={state__is_disabled__input}
              ref={ref__grp_input}
              onKeyDown={fn_handler__key_down__sub_tree_p_input_node}
              onBlur={fn_handler__blur__sub_tree_p_input_node}
            />
          </li>
        </>
      ) : undefined}
    </ul>
  );
};

export default Comp_explorer_layer;

/**
 * 직렬화된 문서나 그룹으로 트리 구조 생성 (2번 선택)
 *
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

// 재귀 함수 했던거 보관
//  const fn_recursion__obj_node_ids = (_obj, _children, _type = null) => {
//   _children.forEach((child) => {
//     if (_type !== null && _type === "group" && child.type !== _type) return;
//     if (_type === null || _type === child.type) _obj[child.id] = false;
//     if (child.children === null || child.children.lenght === 0) return;
//     fn_recursion__obj_node_ids(_obj, child.children, _type);
//   });
// };

// const init_state__obj_node_ids = (_arr_sub_tree_node_list, _type = null) =>
//   _arr_sub_tree_node_list.reduce((obj, t) => {
//     // 성능 최적화를 위한 필터링 (그룹 타입을 필요로할 때 문서 타입은 children이 없으므로 필요가 없음)
//     if (_type !== null && _type === "group" && t.type !== _type) return obj;

//     // 해당 타입이 맞는 경우에만 객체에 저장
//     if (_type === null || _type === t.type) obj[t.id] = false;

//     // 자식 노드가 없는 경우, 다음 노드로 이동
//     if (t.children === null || t.children.length === 0) return obj;

//     // 재귀 함수
//     fn_recursion__obj_node_ids(obj, t.children, _type);
//     return obj;
//   }, {});
