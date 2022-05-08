import { dummies__exp_nodes__arr } from "@/components/common/explorer/items";
import { fn_wrap__fb_GET } from "@/logic/api";
import { fn_GET__exp__nodes_of_roots } from "@/api/explorer";
import { ROOT_NODE_ID } from "@/config/common";
import { FOLDER_TYPE, ROOT_TYPE } from "@/config/explorer";
import type { I_exp_node, I_exp_r_node } from "@/models/explorer";
import type { T_Func, T_SameIOFunc } from "@/models/function";
import type { I_cond_map, I_map } from "@/models/reusables";

interface I_exp__layerd_nodes_arg {
  _cb: T_Func<I_exp__layerd_nodes_arg, I_exp_node[]>;
  nodes_by_p_node_uid__map: I_map<I_exp_node[]>;
  p_node_uid?: string;
}

// export const fn_get__node__obj = async (_obj: any): Promise<I_exp_node> => {
//   const node__obj = await fn_wrap__fb_GET<any, I_exp_node>(, _obj);
// }

export const fn_get__nodes_of_r_node_uids__arr = async (_r_node_uids__arr: string[]): Promise<I_exp_node[]> => {
  const nodes__arr = await fn_wrap__fb_GET<string[], I_exp_node[]>(fn_GET__exp__nodes_of_roots, _r_node_uids__arr);
  if (!nodes__arr) return dummies__exp_nodes__arr;
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
  // console.log("fff", is_folder__node);
  if (!is_folder__node) return false;

  const has_c_node_uids__node = node__obj.c_node_uids && node__obj.c_node_uids.length !== 0;
  // console.log("ddd", has_c_node_uids__node, node__obj.c_node_uids);
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

  if (p_node_uid === "521ae4ae-c079-4378-aca4-d062ccc061ea") {
    console.log(1);
  }

  for (let [idx, node__obj] of sorted_nodes__arr.entries()) {
    node__obj = {...node__obj}; // READ_ONLY
    const is_c_node_uids: boolean = fn_get__is_c_node_uids__bool(node__obj);

    if (node__obj.uid === "521ae4ae-c079-4378-aca4-d062ccc061ea") {
      console.log(node__obj);
    }

    if (is_c_node_uids) {
      const node_uid: string = fn_get__node_uid__str(node__obj);
      node__obj.children = _cb({ _cb, nodes_by_p_node_uid__map, p_node_uid: node_uid });
      sorted_nodes__arr.splice(idx, 1, node__obj);
    }
  }

  return sorted_nodes__arr;
};

export const fn_get__nodes__cond_map = (exp_nodes__arr: I_exp_node[], _type?: string): I_cond_map => {
  return exp_nodes__arr.reduce((obj: I_cond_map, node__obj: I_exp_node) => {
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

export const fn_get__r_nodes_of_non_children = (_uids__arr: string[]): I_exp_r_node[] => {
  return _uids__arr.reduce((arr: I_exp_r_node[], _uid) => {
    return [
      ...arr,
      {
        uid: _uid,
        type: ROOT_TYPE,
        children: [],
      },
    ];
  }, []);
};

// export const fn_get__p_node = (_node__obj: I_exp_node): I_exp_node => {

// }
