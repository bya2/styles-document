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
  const is_initial_mount__bool = useRef(true);

  // Global State
  // ---
  const [g_state__user__obj, set_g_state__user__obj] = useRecoilState(g_state__user);
  const { ref_user_id } = g_state__user__obj;
  // ---

  // Local State
  // ---
  const [state__exp_layers__arr, set_state__exp_layers__arr] = useState([]); // Update

  const [state__is_click__exp_l_root__obj, set_state__is_click__exp_l_root__obj] = useState({});

  const [state__exp_l_trees__arr, set_state__exp_l_trees__arr] = useState([]); // Render

  const [init_state__cond__exp_l_all_node__obj, set_init_state__cond__exp_l_all_node__obj] = useState({});
  const [init_state__cond__exp_l_folder_node__obj, set_init_state__cond__exp_l_folder_node__obj] = useState({});

  const [state__cond__is_active__exp_l_nodes__obj, set_state__cond__is_active__exp_l_nodes__obj] = useState(
    init_state__cond__exp_l_all_node__obj
  );
  const [state__cond__is_click__exp_l_nodes__obj, set_state__cond__is_click__exp_l_nodes__obj] = useState(
    init_state__cond__exp_l_all_node__obj
  );
  const [state__cond__is_fold__exp_l_f_nodes__obj, set_state__cond__is_fold__exp_l_f_nodes__obj] = useState(
    init_state__cond__exp_l_folder_node__obj
  );

  const [state__exp_l_tree_node_names__obj, set_state__exp_l_tree_node_names__obj] = useState({});
  // ---

  // Set
  const fn_set__state__add_node = (root_name, data__obj) => {
    let exp_layers__arr = [...state__exp_layers__arr];
    const idx__layer = exp_layers__arr.findIndex((layer__obj) => layer__obj.name === root_name);
    const nodes__arr = exp_layers__arr[idx__layer].nodes;
    exp_layers__arr[idx__layer].nodes = [...nodes__arr, data__obj];
    const node = nodes__arr.find((node) => node._id.toString() === data__obj.parent);
    node.children = [...node.children, data__obj];
    set_state__exp_layers__arr(exp_layers__arr);
  };

  // Side
  useEffect(() => {
    /**
     * MOUNT
     * UPDATE (L1) (d: 전역 로그인 상태, 현재 리소스)
     */
    const { ref_user_id } = g_state__user__obj;

    // 초기에 탐색기의 각 ROOT를 설정
    // ---
    const is_signed_in__bool = ref_user_id ? true : false;
    const is_same__param_id__bool = ref_user_id === param__id;

    const exp_root__sign_in_user__obj = { key: "exp-root-sign-in-user", name: ref_user_id };
    const exp_root__curr_param__obj = { key: `exp-root-${param__id}`, name: param__id };

    let init_s__exp_roots__arr = !is_signed_in__bool
      ? [exp_root__curr_param__obj]
      : is_same__param_id__bool
      ? [exp_root__curr_param__obj]
      : [exp_root__sign_in_user__obj, exp_root__curr_param__obj];
    // ---

    // 브라우저에 캐시된 루트 정보 존재 여부 확인
    // 캐시된 루트 정보가 있다면 ROOT 배열에 추가 (init_state__exp_roots__arr)
    const exp_roots__cached__arr = sessionStorage.getItem("exp_roots__cached__arr") ?? null;
    if (exp_roots__cached__arr) {
      // 중복 제거 (+CODE)
      init_s__exp_roots__arr = [...init_s__exp_roots__arr, ...exp_roots__cached__arr];
    }

    // 초기 상태 (ROOT 클릭[활성화, 펴기/접기] 여부)
    let init_s__cond__root__obj = init_s__exp_roots__arr.reduce((obj, exp_root__obj) => {
      obj[exp_root__obj.name] = false;
      return obj;
    }, {});
    set_state__is_click__exp_l_root__obj(init_s__cond__root__obj);

    // 루트 정보를 통해 노드(폴더,문서)를 요청 (resolve: 중첩된 배열 형태)
    // 병렬 처리 (Request)
    Promise.all(
      init_s__exp_roots__arr.map((exp_root__obj) => {
        const { name } = exp_root__obj;
        return fn_logic__GET__exp__nodes(name);
      })
    )
      .then((results__n_arr) => {
        const init_s__exp_nodes__arr = results__n_arr.reduce((arr, nodes__arr, i) => {
          return [
            ...arr,
            {
              ...init_s__exp_roots__arr[i],
              nodes: nodes__arr,
            },
          ];
        }, []);
        set_state__exp_layers__arr(init_s__exp_nodes__arr);
        /**
         * {
         *   key: string,
         *   name: string,
         *   nodes: []
         * }
         */
      })
      .catch((err) => {
        console.log("!ERR\nLoc:components/layout/main/explorer (mounted, updated L1)");
        console.error(err);
      });
  }, [g_state__user__obj, param__id]);

  useEffect(() => {
    /**
     * UPDATE (L2) (d: state__exp_nodes__arr)
     */
    if (is_initial_mount__bool.current) return;

    const exp_layers__n_arr = state__exp_layers__arr.reduce((arr, layer__obj) => {
      return [...arr, layer__obj.nodes];
    }, []);

    let init_s__exp_l_trees__arr = [];
    let init_s__cond__exp_l_all_node__obj = {};
    let init_s__cond__exp_l_folder_node__obj = {};
    let init_s__exp_l_tree_node_names__obj = {};

    // --- FOR START (BLOCK) ---
    for (let i = 0; i < exp_layers__n_arr.length; ++i) {
      // (하나의 루트에서) 부모 노드를 기준으로 하는 Layer
      const tmp_layer__by_p_node_id__obj = exp_layers__n_arr[i].reduce((obj, node__obj) => {
        const key__node_id__str = node__obj.parent ? node__obj.parent.toString() : "root";
        if (!obj[key__node_id__str]) obj[key__node_id__str] = [];
        obj[key__node_id__str] = [...obj[key__node_id__str], node__obj];
        return obj;
      }, {});

      // (하나의 루트에서) 계층 구조의 Layer
      // ---
      const exp_l_sub_trees__arr = (_key__node_id = "root") => {
        const prop = !_key__node_id || _key__node_id.length === 0 ? "root" : _key__node_id;
        const children_nodes__arr = [...tmp_layer__by_p_node_id__obj[prop]];

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
            child_node__obj.children = exp_l_sub_trees__arr(child_node__obj._id?.toString() ?? null);
          }
        }

        return children_nodes__arr;
      };

      init_s__exp_l_trees__arr = [
        ...init_s__exp_l_trees__arr,
        {
          ...state__exp_layers__arr[i],
          nodes: exp_l_sub_trees__arr(),
        },
      ];
      // ---

      // 타입 별로 필터링 (문서/폴더)
      let cond__any_type_node__obj = (_node_type = undefined) => {
        return exp_layers__n_arr[i].reduce((obj, node__obj) => {
          if (!_node_type || node__obj.type === _node_type) {
            obj[node__obj._id?.toString()] = false;
          }
          return obj;
        }, {});
      };

      // 루트와 모든 문서들의 초기 BOOL 상태
      init_s__cond__exp_l_all_node__obj = {
        ...init_s__cond__exp_l_all_node__obj,
        ...cond__any_type_node__obj(),
        [state__exp_layers__arr[i].key]: false,
      };

      init_s__cond__exp_l_folder_node__obj = {
        ...init_s__cond__exp_l_folder_node__obj,
        ...cond__any_type_node__obj("folder"),
        [state__exp_layers__arr[i].key]: false,
      };

      // 폴더/문서 이름 배열로
      init_s__exp_l_tree_node_names__obj = state__exp_layers__arr.reduce((obj, sub_layer__obj) => {
        obj[sub_layer__obj.name] = sub_layer__obj.nodes.reduce(
          (obj, node__obj) => {
            if (node__obj.type === "folder" || node__obj.type === "group") {
              obj.folder = [...obj.folder, node__obj.name];
            } else {
              obj.document = [...obj.document, node__obj.name];
            }
            return obj;
          },
          { folder: [], document: [] }
        );

        return obj;
      }, {});
    }
    // --- FOR END (BLOCK) ---

    console.log("MLML", state__exp_layers__arr);
    console.log("MLIU", state__exp_l_trees__arr);

    set_state__exp_l_trees__arr(init_s__exp_l_trees__arr);

    set_init_state__cond__exp_l_all_node__obj(init_s__cond__exp_l_all_node__obj);
    set_init_state__cond__exp_l_folder_node__obj(init_s__cond__exp_l_folder_node__obj);

    set_state__cond__is_active__exp_l_nodes__obj({
      ...state__cond__is_active__exp_l_nodes__obj,
    });
    set_state__cond__is_click__exp_l_nodes__obj({
      ...state__cond__is_click__exp_l_nodes__obj,
    });
    set_state__cond__is_fold__exp_l_f_nodes__obj({
      ...state__cond__is_fold__exp_l_f_nodes__obj,
    });

    set_state__exp_l_tree_node_names__obj(init_s__exp_l_tree_node_names__obj);
  }, [state__exp_layers__arr]);

  useEffect(() => {
    /**
     * MOUNT
     */
    console.log("LL", is_initial_mount__bool.current);
    is_initial_mount__bool.current = false;
  }, []);

  const fn_handle__click__exp_l_root = (e) => {
    // Root
    const e_curr_tg = e.currentTarget;
    const e_curr_tg_name = e_curr_tg.getAttribute("name");

    set_state__is_click__exp_l_root__obj({
      ...state__is_click__exp_l_root__obj,
      [e_curr_tg_name]: !state__is_click__exp_l_root__obj[e_curr_tg_name],
    });
  };

  const fn_handle__focus__exp_l_tree_node = (e, root_id) => {
    const e_curr_tg = e.currentTarget;
    const e_curr_tg_name = e_curr_tg.getAttribute("name");

    set_state__cond__is_active__exp_l_nodes__obj({
      ...state__cond__is_active__exp_l_nodes__obj,
      [e_curr_tg_name]: true,
    });
  };

  const fn_handle__click__exp_l_tree_node = (e, root_id) => {
    e.stopPropagation();

    // Fold, Active
    const e_curr_tg = e.currentTarget;
    const e_curr_tg_name = e_curr_tg.getAttribute("name");

    set_state__cond__is_active__exp_l_nodes__obj({
      ...init_state__cond__exp_l_all_node__obj,
      [e_curr_tg_name]: true,
    });

    set_state__cond__is_fold__exp_l_f_nodes__obj({
      ...state__cond__is_fold__exp_l_f_nodes__obj,
      [e_curr_tg_name]: !state__cond__is_fold__exp_l_f_nodes__obj[e_curr_tg_name],
    });

    set_state__cond__is_click__exp_l_nodes__obj({
      ...init_state__cond__exp_l_all_node__obj,
      [e_curr_tg_name]: true,
    });

    e_curr_tg.addEventListener(
      "blur",
      () => {
        set_state__cond__is_click__exp_l_nodes__obj({
          ...init_state__cond__exp_l_all_node__obj,
        });
      },
      { once: true }
    );
  };

  const fn_handle__click__exp_any_layer = (e) => {
    e.stopPropagation();
    const e_curr_tg = e.currentTarget;
    const e_curr_tg_name = e_curr_tg.getAttribute("name");
    set_state__cond__is_active__exp_l_nodes__obj({
      ...init_state__cond__exp_l_all_node__obj,
      [e_curr_tg_name]: true,
    });

    set_state__cond__is_click__exp_l_nodes__obj({
      ...init_state__cond__exp_l_all_node__obj,
      [e_curr_tg_name]: true,
    });

    e_curr_tg.addEventListener(
      "blur",
      () => {
        set_state__cond__is_click__exp_l_nodes__obj({
          ...init_state__cond__exp_l_all_node__obj,
        });
      },
      { once: true }
    );
  };

  const fn_logic__fold__close_folder = (e_curr_tg_name) => {
    set_state__cond__is_active__exp_l_nodes__obj({
      ...init_state__cond__exp_l_all_node__obj,
      [e_curr_tg_name]: true,
    });

    set_state__cond__is_fold__exp_l_f_nodes__obj({
      ...state__cond__is_fold__exp_l_f_nodes__obj,
      [e_curr_tg_name]: true,
    });

    set_state__cond__is_click__exp_l_nodes__obj({
      ...init_state__cond__exp_l_all_node__obj,
      [e_curr_tg_name]: true,
    });
  };

  return (
    <article className="comp explorer">
      <ul className="item-list">
        <>
          {state__exp_l_trees__arr.map((item__obj) => {
            const { key, name, nodes } = item__obj;
            const cond__is_usr_exp_layer__bool = name === ref_user_id;
            const cond__is_click__root__bool = state__is_click__exp_l_root__obj[name] === true;

            return (
              <li key={key} className="item">
                <ExplorerContext.Provider
                  value={{
                    ctx__root_key: key,
                    ctx__root_name: name,
                    ctx__nodes__arr: nodes,
                    ctx__cond__is_usr_exp_layer__bool: cond__is_usr_exp_layer__bool,
                    ctx__cond__is_click__root__bool: cond__is_click__root__bool,
                    ctx__state__cond__is_active__exp_l_nodes__obj: state__cond__is_active__exp_l_nodes__obj,
                    ctx__state__cond__is_click__exp_l_nodes__obj: state__cond__is_click__exp_l_nodes__obj,
                    ctx__state__cond__is_fold__exp_l_f_nodes__obj: state__cond__is_fold__exp_l_f_nodes__obj,
                    ctx__state__exp_l_tree_node_names__obj: state__exp_l_tree_node_names__obj, // input_node
                    ctx__fn_set__state__add_node: fn_set__state__add_node,
                    ctx__fn_handle__click__exp_l_root: fn_handle__click__exp_l_root,
                    ctx__fn_handle__focus__exp_l_tree_node: fn_handle__focus__exp_l_tree_node,
                    ctx__fn_handle__click__exp_l_tree_node: fn_handle__click__exp_l_tree_node,
                    ctx__fn_handle__click__exp_any_layer: fn_handle__click__exp_any_layer,
                    ctx__fn_logic__fold__close_folder: fn_logic__fold__close_folder,
                    ctx__ref__n_doc_input: ref__n_doc_input,
                    ctx__ref__n_fold_input: ref__n_fold_input,
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
