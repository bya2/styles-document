import { fn_GET__exp__nodes } from "@/api/explorer";
import { dummy_items__exp_nodes__n_arr } from "@/components/common/explorer/items";
import { NODE_TYPE__FOLDER, ROOT_NODE_ID } from "@/config/common";
import type { expNode, expRoot } from "@/models/explorer";
import type { T_AsyncFunc, T_Func, T_SameIOFunc } from "@/models/function";
import type { I_map } from "@/models/reusables";

export const fn_get__exp_nodes__n_arr: T_AsyncFunc<expRoot[], expNode[][]> = (roots__arr) => {
  return Promise.all(
    roots__arr.map((root__obj: expRoot) => {
      const { id } = root__obj;
      return fn_GET__exp__nodes(id);
    })
  ).catch((err) => {
    const ERR_MSG: string = "@/logic/explorer.ts (fn_get__exp_nodes__n_arr)";
    console.error(ERR_MSG);
    return dummy_items__exp_nodes__n_arr;
  });
};

export const fn_get__exp_nodes_by_pnode_id__map: T_Func<expNode[], I_map<expNode[]>> = (nodes__arr) => {
  return nodes__arr.reduce((obj: I_map<expNode[]>, node__obj: expNode) => {
    const pnode: any = node__obj.parent;
    const pnode_id: string = pnode === undefined ? ROOT_NODE_ID : pnode instanceof String ? pnode : pnode.toString();

    if (!obj[pnode_id]) {
      obj[pnode_id] = [];
    }
    obj[pnode_id] = [...obj[pnode_id], node__obj];

    return obj;
  }, {});
};

const fn_get__sorted_exp_nodes__arr: T_SameIOFunc<expNode[]> = (input_nodes__arr) => {
  const output_nodes__arr = [...input_nodes__arr];

  output_nodes__arr.sort((prev_obj, next_obj) => (prev_obj.name > next_obj.name ? 1 : next_obj.name > prev_obj.name ? -1 : 0));
  output_nodes__arr.sort((prev_obj, next_obj) => (prev_obj.type > next_obj.type ? -1 : next_obj.type > prev_obj.type ? 1 : 0));

  return output_nodes__arr;
};

const fn_get__is_children__exp_node__bool: T_Func<expNode, boolean> = (node__obj) => {
  const is_folder__node = node__obj.type === NODE_TYPE__FOLDER;
  if (!is_folder__node) return false;

  const has_chlidren__node = node__obj.children && node__obj.children.length !== 0;
  if (!has_chlidren__node) return false;

  return true;
};

const fn_get__exp_node_id__str: T_Func<expNode, string> = (node__obj) => {
  let id = node__obj.id;

  if (typeof id === "string") {
    id = id.toString();
  }

  return id;
};

interface LayeredArg {
  _cb: T_Func<LayeredArg, expNode[]>;
  exp_nodes_by_pnode_id__map: I_map<expNode[]>;
  pnode_id?: string;
}

export const fn_get__layered_exp_nodes__arr: T_Func<LayeredArg, expNode[]> = ({
  _cb,
  exp_nodes_by_pnode_id__map,
  pnode_id = ROOT_NODE_ID,
}) => {
  const nodes__arr: expNode[] = [...exp_nodes_by_pnode_id__map[pnode_id]];
  const sorted_nodes__arr: expNode[] = fn_get__sorted_exp_nodes__arr(nodes__arr);

  // console.log("pnode_id:", pnode_id, "\nnodes__arr:", nodes__arr, "\n", "sorted_nodes__arr:", sorted_nodes__arr);

  for (const node__obj of sorted_nodes__arr) {
    const is_children__node: boolean = fn_get__is_children__exp_node__bool(node__obj);
    // console.log("is_children__node:",node__obj,is_children__node);
    if (is_children__node) {
      const node_id: string = fn_get__exp_node_id__str(node__obj);
      node__obj.children = _cb({ _cb, exp_nodes_by_pnode_id__map, pnode_id: node_id });
      // console.log("CHILDREN:", node__obj.children);
    }
  }

  return sorted_nodes__arr;
};

export const fn_get__exp_nodes__cond_map = (exp_nodes__arr: expNode[], _type?: string): I_map<boolean> => {
  return exp_nodes__arr.reduce((obj: I_map<boolean>, node__obj: expNode) => {
    if (!_type || node__obj.type === _type) {
      let node_id: any;
      let is_str__node_id: boolean;

      node_id = node__obj.id;
      is_str__node_id = node_id instanceof String;

      if (!is_str__node_id) {
        node_id = node_id.toString();
      }
      obj[node_id] = false;
    }
    return obj;
  }, {});
};
