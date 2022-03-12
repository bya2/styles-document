import React, { useEffect, useState, useRef, useCallback, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import { g_state__user } from "recoil/atoms";

import { ExplorerContext } from "context/explorer";
import { fn_logic__GET__exp__nodes } from "logic/api/get";

import CompExpLayer from "components/layout/main/explorer/layer";
import { fn_logic__POST__exp__add_doc, fn_logic__POST__exp__add_group } from "logic/api/post";

export default function CompExplorer() {
  // Param
  const { id: param__id } = useParams();

  const ref__n_doc_input = useRef();
  const ref__n_fold_input = useRef();

  // Global State
  const [g_state__user__obj, set_g_state__user__obj] = useRecoilState(g_state__user);
  const { ref_user_id } = g_state__user__obj;

  // Local State
  const [state__exp_layers__arr, set_state__exp_layers__arr] = useState([]);
  const [state__is_click__exp_l_root__obj, set_state__is_click__exp_l_root__obj] = useState({});

  const [init_state__cond__exp_l_tree_node__obj, set_init_state__cond__exp_l_tree_node__obj] = useState({});
  const [init_state__cond__exp_l_tree_fold_node__obj, set_init_state__cond__exp_l_tree_fold_node__obj] = useState({});

  const [state__is_active__exp_l_tree_node__obj, set_state__is_active__exp_l_tree_node__obj] = useState({});
  const [state__is_fold__exp_l_tree_node__obj, set_state__is_fold__exp_l_tree_node__obj] = useState({});
  const [state__is_click__exp_l_tree_node__obj, set_state__is_click__exp_l_tree_node__obj] = useState({});

  const [state__t_node_names__obj, set_state__t_node_names__obj] = useState([]);

  // Side
  useEffect(() => {
    // 탐색기 ROOT 객체 리스트 상태 저장
    const cond__is_sign_in__bool = ref_user_id ? true : false;
    const cond__is_same__param_id__bool = ref_user_id === param__id;

    const exp_root__sign_in_user__obj = { key: "exp-root-sign-in-user", name: ref_user_id };
    const exp_root__curr_param__obj = { key: `exp-root-${param__id}`, name: param__id };

    let init_state__exp_roots__arr = !cond__is_sign_in__bool
      ? [exp_root__curr_param__obj]
      : cond__is_same__param_id__bool
      ? [exp_root__curr_param__obj]
      : [exp_root__sign_in_user__obj, exp_root__curr_param__obj];

    // 브라우저에 캐시된 루트 정보가 있는 지 확인
    const exp_roots__cached__arr = sessionStorage.getItem("exp_roots__cached__arr") ?? undefined;

    if (exp_roots__cached__arr) {
      // 중복 제거 할 것
      init_state__exp_roots__arr = [...init_state__exp_roots__arr, ...exp_roots__cached__arr];
    }

    // set_state__exp_layers__arr(init_state__exp_roots__arr);

    // 탐색기 ROOT 클릭 여부 리스트 상태 저장
    let init_state__cond__root__obj = init_state__exp_roots__arr.reduce((obj, exp_root__obj) => {
      obj[exp_root__obj.name] = false;
      return obj;
    }, {});

    set_state__is_click__exp_l_root__obj(init_state__cond__root__obj);
    // set_state__is_active__exp_l_tree__obj(init_state__cond__root__obj);

    // 탐색기 ROOT의 트리를 각각 서버에 요청 (배열로 받음)
    // AXIOS
    Promise.all(
      init_state__exp_roots__arr.map((exp_root__obj) => {
        const { key, name } = exp_root__obj;
        return fn_logic__GET__exp__nodes(name);
      })
    )
      .then((results__n_arr) => {
        let init_state__exp_layers__arr = [...init_state__exp_roots__arr];
        let init_state__cond__exp_l_tree_node__obj = {};
        let init_state__cond__exp_l_tree_fold_node__obj = {};
        let init_state__exp_l_tree_node_names__obj = { folder: [], document: [] };

        const num__exp_layers = init_state__exp_layers__arr.length;
        for (let i = 0; i < num__exp_layers; ++i) {
          // 계층 구조로 변환
          // 상위 노드의 ID를 키로 가진 하위 노드들의 배열로 이루어진 객체 (상위 노드 ID: [하위노드들])
          const node_id_children__obj = results__n_arr[i].reduce((obj, node__obj) => {
            // const key__node_id__str = node__obj.parent?.toString() ?? "root";
            const key__node_id__str = node__obj.parent ? node__obj.parent.toString() : "root";
            if (!obj[key__node_id__str]) obj[key__node_id__str] = [];
            obj[key__node_id__str] = [...obj[key__node_id__str], node__obj];
            return obj;
          }, {});

          // (재귀) 계층 구조 생성
          const fn_logic__re__sub_trees__arr = (_key__node_id = "root") => {
            const prop = !_key__node_id || _key__node_id.length === 0 ? "root" : _key__node_id;
            const children_nodes__arr = [...node_id_children__obj[prop]];

            // 나열할 순서 정렬
            // 이름별 (차선 순위)
            children_nodes__arr.sort((prev_obj, next_obj) =>
              prev_obj.name > next_obj.name ? 1 : next_obj.name > prev_obj.name ? -1 : 0
            );

            // 폴더, 문서별 (우선 순위)
            children_nodes__arr.sort((prev_obj, next_obj) =>
              prev_obj.type > next_obj.type ? -1 : next_obj.type > prev_obj.type ? 1 : 0
            );

            for (const child_node__obj of children_nodes__arr) {
              const cond__is_folder__bool = child_node__obj.type === "folder" || child_node__obj.type === "group";
              if (cond__is_folder__bool && child_node__obj.children.length !== 0) {
                child_node__obj.children = fn_logic__re__sub_trees__arr(child_node__obj._id?.toString() ?? null);
              }
            }

            return children_nodes__arr;
          };

          init_state__exp_layers__arr[i] = {
            ...init_state__exp_layers__arr[i],
            nodes: fn_logic__re__sub_trees__arr(),
          };

          // 2층의 구조로 변환 (루트 키, 루트 이름, 노드들)
          // 매개변수를 가지면 해당 타입에 해당하는 노드, 매개변수가 없으면 모든 노드 반환
          let init_state__cond__tree__obj = (_node_type = undefined) => {
            return results__n_arr[i].reduce((obj, node__obj) => {
              if (!_node_type || node__obj.type === _node_type) {
                obj[node__obj._id?.toString()] = false;
              }
              return obj;
            }, {});
          };

          init_state__cond__exp_l_tree_node__obj = {
            [init_state__exp_roots__arr[i].key]: false,
            ...init_state__cond__exp_l_tree_node__obj,
            ...init_state__cond__tree__obj(),
          };

          init_state__cond__exp_l_tree_fold_node__obj = {
            [init_state__exp_roots__arr[i].key]: false,
            ...init_state__cond__exp_l_tree_fold_node__obj,
            ...init_state__cond__tree__obj("group"),
          };

          // 폴더 및 문서의 이름을 배열로 묶음
          // usage: 폴더, 문서 이름 찾기
          init_state__exp_l_tree_node_names__obj.folder = results__n_arr[i].reduce((arr, node__obj) => {
            if (node__obj.type === "group") {
              return [...arr, node__obj.name];
            } else {
              return [...arr];
            }
          }, []);

          init_state__exp_l_tree_node_names__obj.document = results__n_arr[i].reduce((arr, node__obj) => {
            if (node__obj.type === "document") {
              return [...arr, node__obj.name];
            } else {
              return [...arr];
            }
          }, []);
        }

        set_state__exp_layers__arr(init_state__exp_layers__arr);

        set_init_state__cond__exp_l_tree_node__obj(init_state__cond__exp_l_tree_node__obj);
        set_init_state__cond__exp_l_tree_fold_node__obj(init_state__cond__exp_l_tree_fold_node__obj);
        set_state__is_active__exp_l_tree_node__obj(init_state__cond__exp_l_tree_node__obj);
        set_state__is_fold__exp_l_tree_node__obj(init_state__cond__exp_l_tree_fold_node__obj);
        set_state__is_click__exp_l_tree_node__obj(init_state__cond__exp_l_tree_node__obj);
        set_state__t_node_names__obj(init_state__exp_l_tree_node_names__obj);
      })
      .catch((err) => {
        console.log("!ERR\nLoc:components/layout/main/explorer (mounted, updated)");
        console.error(err);
      });
  }, [g_state__user__obj]);

  // Event
  const fn_handle__click__exp_l_root = (e) => {
    const e_curr_tg = e.currentTarget;
    const e_curr_tg_name = e_curr_tg.getAttribute("name");

    set_state__is_click__exp_l_root__obj({
      ...init_state__cond__exp_l_tree_node__obj,
      [e_curr_tg_name]: !state__is_click__exp_l_root__obj[e_curr_tg_name],
    });
  };

  const fn_handle__focus__exp_l_tree_node = (e, root_id) => {
    const e_curr_tg = e.currentTarget;
    const e_curr_tg_name = e_curr_tg.getAttribute("name");

    set_state__is_active__exp_l_tree_node__obj({
      ...state__is_active__exp_l_tree_node__obj,
      [e_curr_tg_name]: true,
    });
  };

  const fn_handle__click__exp_l_tree_node = (e, root_id) => {
    e.stopPropagation();

    // Fold, Active
    const e_curr_tg = e.currentTarget;
    const e_curr_tg_name = e_curr_tg.getAttribute("name");

    set_state__is_active__exp_l_tree_node__obj({
      ...init_state__cond__exp_l_tree_node__obj,
      [e_curr_tg_name]: true,
    });

    set_state__is_fold__exp_l_tree_node__obj({
      ...state__is_fold__exp_l_tree_node__obj,
      [e_curr_tg_name]: !state__is_fold__exp_l_tree_node__obj[e_curr_tg_name],
    });

    set_state__is_click__exp_l_tree_node__obj({
      ...init_state__cond__exp_l_tree_node__obj,
      [e_curr_tg_name]: true,
    });

    e_curr_tg.addEventListener(
      "blur",
      () => {
        set_state__is_click__exp_l_tree_node__obj({
          ...init_state__cond__exp_l_tree_node__obj,
        });
      },
      { once: true }
    );
  };

  const fn_handle__click__exp_any_layer = (e) => {
    e.stopPropagation();
    const e_curr_tg = e.currentTarget;
    const e_curr_tg_name = e_curr_tg.getAttribute("name");
    set_state__is_active__exp_l_tree_node__obj({
      ...init_state__cond__exp_l_tree_node__obj,
      [e_curr_tg_name]: true,
    });

    set_state__is_click__exp_l_tree_node__obj({
      ...init_state__cond__exp_l_tree_node__obj,
      [e_curr_tg_name]: true,
    });

    e_curr_tg.addEventListener(
      "blur",
      () => {
        set_state__is_click__exp_l_tree_node__obj({
          ...init_state__cond__exp_l_tree_node__obj,
        });
      },
      { once: true }
    );
  };

  const fn_logic__fold__close_folder = (e_curr_tg_name) => {
    set_state__is_active__exp_l_tree_node__obj({
      ...init_state__cond__exp_l_tree_node__obj,
      [e_curr_tg_name]: true,
    });

    set_state__is_fold__exp_l_tree_node__obj({
      ...state__is_fold__exp_l_tree_node__obj,
      [e_curr_tg_name]: true,
    });

    set_state__is_click__exp_l_tree_node__obj({
      ...init_state__cond__exp_l_tree_node__obj,
      [e_curr_tg_name]: true,
    });
  };

  return (
    <article className="comp explorer">
      <ul className="item-list">
        <>
          {state__exp_layers__arr.map((item__obj) => {
            const { key, name, nodes } = item__obj;
            const cond__is_usr_exp_layer__bool = name === ref_user_id;
            const cond__is_click__exp_l_root__bool = state__is_click__exp_l_root__obj[name] === true;

            return (
              <li key={key} className="item">
                <ExplorerContext.Provider
                  value={{
                    layer__key: key,
                    param__id: name,
                    nodes__arr: nodes,
                    cond__is_usr_exp_layer__bool,
                    cond__is_click__exp_l_root__bool,
                    state__is_active__exp_l_tree_node__obj: state__is_active__exp_l_tree_node__obj,
                    state__is_fold__exp_l_tree_node__obj: state__is_fold__exp_l_tree_node__obj,
                    state__is_click__exp_l_tree_node__obj: state__is_click__exp_l_tree_node__obj,
                    state__t_node_names__obj,
                    fn_handle__click__exp_l_root,
                    fn_handle__focus__exp_l_tree_node,
                    fn_handle__click__exp_l_tree_node,
                    fn_handle__click__exp_any_layer,
                    fn_logic__fold__close_folder,
                    ref__n_doc_input,
                    ref__n_fold_input,
                  }}
                >
                  <CompExpLayer />
                </ExplorerContext.Provider>
              </li>
            );
          })}
        </>
      </ul>
    </article>
  );
}
