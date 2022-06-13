import { useEffect, useState } from "react";
import type { TOrU, TReturnState } from "@/@types/reusable";

const getLocalValue = <T>(_key: string, _initValue?: T): TOrU<T> => {
  const unparsedStr = globalThis.localStorage.getItem(_key);
  if (!unparsedStr) return _initValue;

  const parsed: T = JSON.parse(unparsedStr);
  return parsed;
};

export default function useLocalStorage<T>(_key: string, _initValue?: T): TReturnState<TOrU<T>> {
  const [value, setValue] = useState<TOrU<T>>(() => getLocalValue<T>(_key, _initValue));

  useEffect(() => {
    globalThis.localStorage.setItem(_key, JSON.stringify(value));
  }, [_key, value]);

  return [value, setValue];
}
