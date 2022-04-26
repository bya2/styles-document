import { fn_handle__error__ctx } from "@/logic/reusable";
import type { I_auth__sign_in_account, I_auth__sign_up_account } from "@/models/auth";
import type { I_map, I_obj } from "@/models/reusables";

export const fn_get__init_s__sign_in = (_items__arr: I_obj[]): I_auth__sign_in_account | I_auth__sign_up_account => {
  try {
    if (!_items__arr) {
      throw new Error("LOC:@/logic/auth/fn_get__init_s__sign_in");
    }
  } catch (err) {
    fn_handle__error__ctx(err);
  }

  return _items__arr.reduce((obj: I_map<string>, _item__obj) => {
    obj[_item__obj.id] = "";
    return obj;
  }, {}) as I_auth__sign_in_account | I_auth__sign_up_account;
};
