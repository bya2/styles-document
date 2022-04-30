import { v4 as uuidv4 } from "uuid";
import { db } from "@/firebase";
import { arrayRemove, arrayUnion, orderBy, where, WriteBatch } from "firebase/firestore";
import {
  fn_get__fb__document_ref,
  fn_get__fb__collection_ref,
  fn_GET__fb__collection_docs,
  fn_POST__fb__add_doc,
  fn_DELETE__fb__doc,
  fn_PATCH__fb__update_doc,
  fn_wrap__run_transaction,
  fn_wrap__write_batch,
} from "@/logic/firebase";
import { I_exp_input_node, I_exp_node, I_exp_r_node } from "@/models/explorer";
import { I_api_result } from "@/models/api";

interface I_fb_ref__sds_exp_nodes extends I_exp_node {}

const fb_path__sds_exp_nodes = "sds/exp/nodes";
const col__sds_exp_nodes = fn_get__fb__collection_ref<I_fb_ref__sds_exp_nodes>(db, fb_path__sds_exp_nodes);

// POST
export const fn_POST__exp__create_node = async (_obj: I_exp_input_node): Promise<string> => {
  const uid = uuidv4() as string;

  const node__obj: I_exp_node = {
    uid: uid,
    ..._obj,
  };

  await fn_wrap__write_batch(db, async (batch: WriteBatch) => {
    const doc__node = fn_get__fb__document_ref(db, `${fb_path__sds_exp_nodes}/${uid}`);
    console.log("pnodid", _obj.p_node_uid);
    batch.set(doc__node, node__obj);

    if (_obj.r_node_uid !== _obj.p_node_uid) {
      const doc__p_node = fn_get__fb__document_ref(db, `${fb_path__sds_exp_nodes}/${_obj.p_node_uid}`);
      batch.update(doc__p_node, {
        c_node_uids: arrayUnion(uid),
      });
    }
  });

  // await fn_POST__fb__add_doc(col__sds_exp_nodes, node__obj);

  // const doc__p_node = fn_get__fb__document_ref(db, `${fb_path__sds_exp_nodes}/${_obj.p_node_uid}`);

  // await fn_PATCH__fb__update_doc(doc__p_node, {
  //   c_node_uids: arrayUnion(uid),
  // });

  return uid;
};

// GET
export const fn_GET__exp__node = async (_uid: string): Promise<I_exp_node> => {
  const q_constraints__arr = [where("uid", "==", _uid)];
  const results = await fn_GET__fb__collection_docs(col__sds_exp_nodes, q_constraints__arr);
  const result = results[0] as I_exp_node;

  if (!result) throw new Error("void");

  return result;
};

export const fn_GET__exp__nodes_of_root = async (_obj: I_exp_r_node): Promise<I_exp_node[]> => {
  const q_constraints__arr = [where("r_node_id", "==", _obj.uid), orderBy("name", "asc")];
  const results = await fn_GET__fb__collection_docs(col__sds_exp_nodes, q_constraints__arr);

  if (!results[0]) throw new Error("void");

  return results as I_exp_node[];
};

export const fn_GET__exp__nodes_of_roots = async (_r_node_uids__arr: string[]): Promise<I_exp_node[]> => {
  const q_constraints__arr = [where("r_node_uid", "in", _r_node_uids__arr)];
  const results = (await fn_GET__fb__collection_docs(col__sds_exp_nodes, q_constraints__arr)) as I_exp_node[];
  return results;
};

// PATCH
export const fn_PATCH__exp__node_name = async (_obj: I_exp_node): Promise<boolean> => {
  const doc__node = fn_get__fb__document_ref(db, `${fb_path__sds_exp_nodes}/${_obj.uid}`);
  await fn_PATCH__fb__update_doc(doc__node, {
    name: _obj.name,
  });
  return true;
};

export const fn_PATCH__exp__node_children = async (_obj: I_exp_node): Promise<boolean> => {
  const doc__p_node = fn_get__fb__document_ref(db, `${fb_path__sds_exp_nodes}/${_obj.p_node_uid}`);
  await fn_PATCH__fb__update_doc(doc__p_node, {
    c_node_uids: arrayRemove(_obj.uid),
  });
  return true;
};

// DELETE
export const fn_DELETE__exp__node = async (_obj: I_exp_node): Promise<boolean> => {
  const doc__node = fn_get__fb__document_ref(db, `${fb_path__sds_exp_nodes}/${_obj.uid}`);
  await fn_DELETE__fb__doc(doc__node);
  await fn_PATCH__exp__node_children(_obj);
  return true;
};
