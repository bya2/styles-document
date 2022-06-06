import { useState, useCallback } from "react";
import type { IDir } from "@/@types/reusable";

export const getDirOfObjList = <V>(_arr: any[], _tgProp: string, _initValue: V): IDir<V> => {
  return _arr.reduce((_dir: IDir<V>, _obj: any) => {
    _dir[_obj[_tgProp]] = _initValue;
    return _dir;
  }, {});
};

export default function useDir<V>(_arr: any[], _tgProp: string, _initValue: V) {
  const [dir, setDir] = useState<IDir<V>>(() => getDirOfObjList<V>(_arr, _tgProp, _initValue));

  const upsertDir = useCallback((_tgProp: string, _initValue: V) => {
    setDir((prev) => {
      return {
        ...prev,
        [_tgProp]: _initValue,
      };
    });
  }, []);

  const removeDir = useCallback((_tgProp: string) => {
    setDir((prev) => {
      const curr = { ...prev };
      delete curr[_tgProp];
      return curr;
    });
  }, []);

  return [dir, { upsertDir, removeDir }];
}
