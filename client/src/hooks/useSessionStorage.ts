import { useEffect, useState } from "react";
import type { TOrU } from "@/@types/reusable";

export const getSessionStorageValue = <T>(_key: string, _initValue?: T): TOrU<T> => {
  const unparsedStr = globalThis.sessionStorage.getItem(_key);
  if (!unparsedStr) return _initValue;

  const parsed: T = JSON.parse(unparsedStr);
  return parsed;
};

export default function useSessionStorage<T>(_key: string, _initValue?: T) {
  const [value, setValue] = useState<TOrU<T>>(() => getSessionStorageValue(_key, _initValue));

  useEffect(() => {
    globalThis.sessionStorage.setItem(_key, JSON.stringify(value));
  }, [_key, value]);

  return [value, setValue];
}
