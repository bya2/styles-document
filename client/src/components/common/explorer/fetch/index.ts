
    // cb_get__exp_nodes__n_arr(s__exp_roots__arr)
    // .then((exp_nodes__n_arr: expNode[][]) => {
    //   let exp_trees__arr: expTree[] = [];
    //   let exp_nodes__cond_map: I_map<boolean> = {};
    //   let exp_f_nodes__cond_map: I_map<boolean> = {};

    //   for (const [exp_root_idx, exp_nodes__arr] of [...exp_nodes__n_arr].entries()) {
    //     const exp_nodes_by_pnode_id__map = cb_get__get__exp_nodes_by_pnode_id__map(exp_nodes__arr);
    //     console.log(exp_root_idx, s__exp_roots__arr[exp_root_idx].id);

    //     const layered_exp_nodes__arr = cb_get__layered_nodes__arr({
    //       _cb: cb_get__layered_nodes__arr,
    //       nodes_by_p_node_uid__map: exp_nodes_by_pnode_id__map,
    //       // pnode_id: s__exp_roots__arr[exp_root_idx].id, // (서버와 연결될 때, -현재 DUMMY 데이터 사용 중-)
    //     });

    //     exp_trees__arr = [
    //       ...exp_trees__arr,
    //       {
    //         id: ROOT_NODE_ID,
    //         children: layered_exp_nodes__arr,
    //       },
    //     ];

    //     // console.log("TREES:", exp_trees__arr);

    //     exp_nodes__cond_map = {
    //       ...exp_nodes__cond_map,
    //       ...cb_get__nodes__cond_map(exp_nodes__arr),
    //       // [s__exp_roots__arr[exp_root_idx].id]: false,
    //       [ROOT_NODE_ID]: false,
    //     };

    //     exp_f_nodes__cond_map = {
    //       ...exp_f_nodes__cond_map,
    //       ...cb_get__nodes__cond_map(exp_nodes__arr, NODE_TYPE__FOLDER),
    //       // [s__exp_roots__arr[exp_root_idx].id]: false,
    //       [ROOT_NODE_ID]: false,
    //     };
    //   }

    //   // console.log("CONDMAP:", exp_nodes__cond_map, exp_f_nodes__cond_map);

    //   dispatch(set_s__exp__init_mount());

    //   return {
    //     exp_trees__arr,
    //     exp_nodes__cond_map,
    //     exp_f_nodes__cond_map,
    //   };
    // })
    // .then((results) => {
    //   dispatch(set_s__exp_trees__arr(results.exp_trees__arr));

    //   dispatch(
    //     set_init_s__exp_nodes__cond__map({
    //       ...s__exp__init_s__cond_map,
    //       ...results.exp_nodes__cond_map,
    //     })
    //   );

    //   dispatch(
    //     set_s__exp_nodes__is_active_node__map({
    //       ...s__exp__is_active_node__map,
    //       ...results.exp_nodes__cond_map,
    //       [ROOT_NODE_ID]: true,
    //     })
    //   );

    //   dispatch(
    //     set_s__exp_f_nodes__is_fold_node__map({
    //       ...s__exp__is_fold_f_node__map,
    //       ...results.exp_f_nodes__cond_map,
    //       [ROOT_NODE_ID]: true,
    //     })
    //   );
    // })
    // .catch((err) => {
    //   const ERR_MSG = "@/components/common/explorer/Explorer.tsx (MOUNT)";
    //   console.error(`${ERR_MSG}\n${err}`);
    // });