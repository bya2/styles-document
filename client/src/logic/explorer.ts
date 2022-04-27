import { dummies__exp_nodes__arr } from "@/components/common/explorer/items";
import { fn_wrap__fb_GET } from "./api";
import { fn_GET__exp__nodes_of_roots } from "@/api/explorer";
import { ROOT_NODE_ID } from "@/config/common";
import { FOLDER_TYPE } from "@/config/explorer";
import type { I_exp_node } from "@/models/explorer";
import type { T_Func, T_SameIOFunc } from "@/models/function";
import type { I_cond_map, I_map } from "@/models/reusables";

interface I_exp__layerd_nodes_arg {
  _cb: T_Func<I_exp__layerd_nodes_arg, I_exp_node[]>;
  nodes_by_p_node_uid__map: I_map<I_exp_node[]>;
  p_node_uid?: string;
}

export const fn_get__nodes_of_roots__arr = async (_roots: string[]): Promise<I_exp_node[]> => {
  let nodes__arr = await fn_wrap__fb_GET<string[], I_exp_node[]>(fn_GET__exp__nodes_of_roots, _roots);
  if (!nodes__arr) nodes__arr = dummies__exp_nodes__arr;
  return nodes__arr;
};

export const fn_get__nodes_by_r_node_uid__map = (_nodes__arr: I_exp_node[]): I_map<I_exp_node[]> => {
  return _nodes__arr.reduce((obj: I_map<I_exp_node[]>, node__obj: I_exp_node) => {
    const r_node_uid = node__obj.r_node_uid;
    if (!obj[r_node_uid]) obj[r_node_uid] = [];
    obj[r_node_uid] = [...obj[r_node_uid], node__obj];
    return obj;
  }, {});
};

export const fn_get__nodes_by_p_node_uid__map = (_nodes__arr: I_exp_node[]): I_map<I_exp_node[]> => {
  return _nodes__arr.reduce((obj: I_map<I_exp_node[]>, node__obj: I_exp_node) => {
    const p_node_uid: string = node__obj.p_node_uid;

    if (!obj[p_node_uid]) obj[p_node_uid] = [];
    obj[p_node_uid] = [...obj[p_node_uid], node__obj];

    return obj;
  }, {});
};

const fn_get__sorted_nodes__arr: T_SameIOFunc<I_exp_node[]> = (_input_nodes__arr) => {
  const output_nodes__arr = [..._input_nodes__arr];

  output_nodes__arr.sort((prev_obj, next_obj) => (prev_obj.name > next_obj.name ? 1 : next_obj.name > prev_obj.name ? -1 : 0));
  output_nodes__arr.sort((prev_obj, next_obj) => (prev_obj.type > next_obj.type ? -1 : next_obj.type > prev_obj.type ? 1 : 0));

  return output_nodes__arr;
};

const fn_get__is_c_node_uids__bool = (node__obj: I_exp_node): boolean => {
  const is_folder__node = node__obj.type === FOLDER_TYPE;
  if (!is_folder__node) return false;

  const has_c_node_uids__node = node__obj.c_node_uids && node__obj.c_node_uids.length !== 0;
  if (!has_c_node_uids__node) return false;

  return true;
};

const fn_get__node_uid__str = (node__obj: I_exp_node): string => {
  let uid = node__obj.uid;
  if (typeof uid === "string") {
    uid = uid.toString();
  }
  return uid;
};

export const fn_get__layered_nodes__arr: T_Func<I_exp__layerd_nodes_arg, I_exp_node[]> = ({
  _cb,
  nodes_by_p_node_uid__map,
  p_node_uid = ROOT_NODE_ID,
}) => {
  const nodes__arr: I_exp_node[] = [...nodes_by_p_node_uid__map[p_node_uid]];
  const sorted_nodes__arr: I_exp_node[] = fn_get__sorted_nodes__arr(nodes__arr);

  // console.log("pnode_id:", pnode_id, "\nnodes__arr:", nodes__arr, "\n", "sorted_nodes__arr:", sorted_nodes__arr);

  for (const node__obj of sorted_nodes__arr) {
    const is_c_node_uids: boolean = fn_get__is_c_node_uids__bool(node__obj);
    // console.log("is_children__node:",node__obj,is_children__node);
    if (is_c_node_uids) {
      const node_uid: string = fn_get__node_uid__str(node__obj);
      node__obj.children = _cb({ _cb, nodes_by_p_node_uid__map, p_node_uid: node_uid });
      // console.log("CHILDREN:", node__obj.children);
    }
  }

  return sorted_nodes__arr;
};

export const fn_get__nodes__cond_map = (exp_nodes__arr: I_exp_node[], _type?: string): I_cond_map => {
  return exp_nodes__arr.reduce((obj: I_map<boolean>, node__obj: I_exp_node) => {
    if (!_type || node__obj.type === _type) {
      let node_uid: any;
      let is_str__node_uid: boolean;

      node_uid = node__obj.uid;
      is_str__node_uid = node_uid instanceof String;

      if (!is_str__node_uid) {
        node_uid = node_uid.toString();
      }
      obj[node_uid] = false;
    }
    return obj;
  }, {});
};
