import type { I_cond_map, I_map, I_obj } from "@/models/reusables";

// OBJ ITEM
export const fn_get__cond__obj = (_items__arr: I_obj[]): I_map<boolean> => {
  return _items__arr.reduce((obj: I_map<boolean>, item__obj: I_obj) => {
    obj[item__obj.id] = false;
    return obj;
  }, {});
};

export const fn_get__init_s__bool_map = (_items__arr: I_obj[]): I_map<boolean> => {
  if (!_items__arr) return {};

  return _items__arr.reduce((obj: I_map<boolean>, item__obj: I_obj) => {
    obj[item__obj.id] = false;
    return obj;
  }, {});
};

// SUCCESS, ERROR
export const fn_handle__success__ctx = (msg?: string) => {
  console.log(msg);
};

export const fn_handle__error__ctx = (err: Error, msg?: string) => {
  const ERR_MSG = msg;
  console.error(`${ERR_MSG}\n${err}`);
};

// OBJ ITEM
export const fn_get__init_cond_map = (_items__arr: I_obj[]): I_map<boolean> => {
  try {
    if (!_items__arr) {
      throw new Error("LOC:@/logic/auth/fn_get__init_s__sign_in");
    }
  } catch (err) {
    fn_handle__error__ctx(err);
  }

  return _items__arr.reduce((obj: I_map<boolean>, item__obj: I_obj) => {
    obj[item__obj.id] = false;
    return obj;
  }, {});
};

export const fn_get__cond_map_of_objs = (_objs__arr: any[], _id: string): I_cond_map => {
  return _objs__arr.reduce((obj: I_cond_map, _obj) => {
    obj[_obj[_id]] = false;
    return obj;
  }, {});
};

export const fn_get__cond_map_of_uids = (_uids__arr: string[]): I_cond_map => {
  return _uids__arr.reduce((obj: I_cond_map, uid) => {
    obj[uid] = false;
    return obj;
  }, {});
};

export const fn_get__init_str_map = (_items__arr: I_obj[]): I_map<string> => {
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
  }, {});
};
