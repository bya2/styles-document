import { db } from "@/firebase";
import { where } from "firebase/firestore";
import { fn_get__fb__collection_ref, fn_POST__fb__add_doc, fn_GET__fb__collection_docs } from "@/logic/firebase";
import type {
  I_fb_ref__sds_auth_accounts,
  I_auth__sign_in_account,
  I_auth__sign_up_account,
  I_auth__validation,
  I_auth__sign_in_ref,
} from "@/models/auth";

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
  };

  await fn_POST__fb__add_doc(col__sds_auth_accounts, req_body__obj);
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
