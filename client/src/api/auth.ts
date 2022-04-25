import { db } from "@/firebase";
import { where } from "firebase/firestore";
import { fn_get__fb__collection_ref, fn_POST__fb__add_doc, fn_GET__fb__collection_docs } from "@/logic/firebase";

export const fb_path__sds_auth_account = "sds/auth/accounts";

export interface I_fb_ref__sds_auth_account {
  id: string;
  password: string;
  check_password: string;
  email: string;
}

export interface I_auth__sign_up_account {
  id: string;
  password: string;
  check_password: string;
  email: string;
}

export interface I_auth__sign_in_account {
  id: string;
  password: string;
}

export interface I_auth__validation {
  id: string;
  hashed: string;
}

const col__sds_auth_account = fn_get__fb__collection_ref<I_fb_ref__sds_auth_account>(db, "sds/auth/accounts");

export const fn_POST__auth__sign_up = async (_d: I_auth__sign_up_account) => {
  await fn_POST__fb__add_doc(col__sds_auth_account, _d);
};

export const fn_GET__auth__sign_in = async (_d: I_auth__sign_in_account) => {
  const q_constraints__arr = [where("id", "==", _d.id), where("password", "==", _d.password)];
  const results = await fn_GET__fb__collection_docs(col__sds_auth_account, q_constraints__arr);
  console.log(results);
};

export const fn_GET__auth__validation = async (_d: I_auth__validation) => {
  const q_constraints__arr = [where("id", "==", _d.id), where("password", "==", _d.hashed)];
  const results = await fn_GET__fb__collection_docs(col__sds_auth_account, q_constraints__arr);
  console.log(results);
};
