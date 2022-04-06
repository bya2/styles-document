import type { cond, item } from "@/models/reusables";

export const fn_get__cond__obj = (_items__arr: item[]): cond => {
  return _items__arr.reduce((obj: cond, item__obj: item) => {
    obj[item__obj.id] = false;
    return obj;
  }, {});
};