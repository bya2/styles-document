import type { I_map, I_obj } from "@/models/reusables";

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

export const fn_get__init_s__str_map = (_items__arr: I_obj[]): I_map<string> => {
  if (!_items__arr) return {};

  return _items__arr.reduce((obj: I_map<string>, item__obj: I_obj) => {
    obj[item__obj.id] = "";
    return obj;
  }, {});
};

export const fn_get__str_map__obj = (_items__arr: I_obj[]): I_map<string> => {
  if (!_items__arr) return {};

  return _items__arr.reduce((obj: I_map<string>, item__obj: I_obj) => {
    obj[item__obj.id] = "";
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
