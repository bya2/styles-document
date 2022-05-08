import { db } from "@/firebase";
import { arrayRemove, arrayUnion, where } from "firebase/firestore";
import {
  fn_get__fb__collection_ref,
  fn_get__fb__document_ref,
  fn_GET__fb__collection_docs,
  fn_PATCH__fb__update_doc,
  fn_POST__fb__set_doc,
  fn_GET__fb__doc,
} from "@/logic/firebase";
import type {
  I_fb_ref__sds_auth_accounts,
  I_auth__sign_in_account,
  I_auth__sign_up_account,
  I_auth__validation,
  I_auth__sign_in_ref,
} from "@/models/auth";
import { I_search_users } from "@/models/search";

export const fb_path__sds_auth_accounts = "sds/auth/accounts";

const col__sds_auth_accounts = fn_get__fb__collection_ref<I_fb_ref__sds_auth_accounts>(db, fb_path__sds_auth_accounts);

// POST
export const fn_POST__auth__sign_up = async (_obj: I_auth__sign_up_account): Promise<boolean> => {
  if (_obj.password !== _obj.check_password) {
    return false;
  }

  // (추가 예정)
  // 암호화REF = _obj.password를 다른 정보와 조합해서 특정 방식으로 암호화

  const req_body__obj = {
    id: _obj.id,
    hashed: _obj.password, // => 암호화REF
    email: _obj.email,
    bookmarks: [],
  };

  const doc__id = fn_get__fb__document_ref(db, `${fb_path__sds_auth_accounts}/${_obj.id}`);
  await fn_POST__fb__set_doc(doc__id, req_body__obj);
  return true;
};

// GET
export const fn_GET__auth__sign_in = async (_obj: I_auth__sign_in_account) => {
  // (추가 예정)
  // 암호화REF = _obj.password를 다른 정보와 조합해서 특정 방식으로 암호화
  const q_constraints__arr = [where("id", "==", _obj.id), where("hashed", "==", _obj.password)]; // _obj.password => 암호화REF
  const results = await fn_GET__fb__collection_docs(col__sds_auth_accounts, q_constraints__arr);

  if (!results[0]) {
    throw new Error("void");
  }

  return results[0] as I_auth__sign_in_ref;
};

export const fn_GET__auth__validation = async (_d: I_auth__validation) => {
  const q_constraints__arr = [where("id", "==", _d.id), where("hashed", "==", _d.hashed)];
  const results = await fn_GET__fb__collection_docs(col__sds_auth_accounts, q_constraints__arr);

  if (!results[0]) {
    throw new Error("void");
  }

  return true;
};

export const fn_GET__search__users = async (_arg: string) => {
  const q_constraints__arr = [where("id", "==", _arg)];
  const results = (await fn_GET__fb__collection_docs(col__sds_auth_accounts, q_constraints__arr)) as I_auth__sign_in_ref[];

  if (!results[0]) {
    return [];
  }

  return results.map((result) => ({ id: result.id })) as I_search_users[];
};

export const fn_GET__auth__bookmarks = async (_obj: { id: string }) => {
  const doc__id = fn_get__fb__document_ref(db, `${fb_path__sds_auth_accounts}/${_obj.id}`);
  const obj = await fn_GET__fb__doc(doc__id);
  if (!obj) throw new Error("void");
  return obj.bookmarks;
};

// PATCH
export const fn_PATCH__auth__add_bookmark = async (_obj: { id: string; bookmark: string }) => {
  const doc__id = fn_get__fb__document_ref(db, `${fb_path__sds_auth_accounts}/${_obj.id}`);

  console.log(`${fb_path__sds_auth_accounts}/${_obj.id}`);
  await fn_PATCH__fb__update_doc(doc__id, {
    bookmarks: arrayUnion(_obj.bookmark),
  });
  return true;
};

export const fn_PATCH__auth__remove_bookmark = async (_obj: { id: string; bookmark: string }) => {
  const doc__id = fn_get__fb__document_ref(db, `${fb_path__sds_auth_accounts}/${_obj.id}`);
  await fn_PATCH__fb__update_doc(doc__id, {
    bookmarks: arrayRemove(_obj.bookmark),
  });
  return true;
};
