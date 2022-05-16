import { v4 as uuidv4 } from "uuid";
import { db } from "@/firebase";
import { arrayRemove, arrayUnion, limit, orderBy, startAt, Transaction, where, WriteBatch } from "firebase/firestore";
import {
  fn_get__fb__document_ref,
  fn_get__fb__collection_ref,
  fn_GET__fb__collection_docs,
  fn_POST__fb__add_doc,
  fn_DELETE__fb__doc,
  fn_PATCH__fb__update_doc,
  fn_wrap__run_transaction,
  fn_wrap__write_batch,
  fn_POST__fb__set_doc,
} from "@/logic/firebase";
import { I_doc__elem } from "@/models/document";

interface I_fb_ref__sds_doc_elems {}

const fb_path__sds_doc_elems = "sds/doc/elemes";
const col__sds_doc_elems = fn_get__fb__collection_ref<I_fb_ref__sds_doc_elems>(db, fb_path__sds_doc_elems);

// POST
export const fn_POST__doc__create_elem = async (_obj: {
  doc_uid: string;
  uid: string;
  title: string;
  value: string;
}): Promise<boolean> => {
  const doc__id = fn_get__fb__document_ref(db, `${fb_path__sds_doc_elems}/${_obj.uid}`);
  await fn_POST__fb__set_doc(doc__id, _obj);
  return true;
};

// GET
export const fn_GET__doc__elems_of_doc = async (_obj: { doc_uid: string }): Promise<I_doc__elem[]> => {
  const q_constraints__arr = [where("doc_uid", "==", _obj.doc_uid)];
  const results = await fn_GET__fb__collection_docs(col__sds_doc_elems, q_constraints__arr);
  return results;
};

// PATCH
export const fn_PATCH__doc__elem_value = async (_obj: any) => {
  const doc__elem = fn_get__fb__document_ref(db, `${fb_path__sds_doc_elems}/${_obj.uid}`);
  await fn_PATCH__fb__update_doc(doc__elem, {
    value: _obj.value,
  });
  return true;
};

// DELETE
export const fn_DELETE__doc__elem = async (_obj: any) => {
  const doc__elem = fn_get__fb__document_ref(db, `${fb_path__sds_doc_elems}/${_obj.uid}`);
  await fn_DELETE__fb__doc(doc__elem);
  return true;
};
