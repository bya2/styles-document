import { useEffect } from "react";
import { useState } from "react";

const getLocalValue = (key: string, initValue: any) => {
  const nonParseLSValue = window.localStorage.getItem(key);
  if (!nonParseLSValue) return initValue;

  const parseLSValue = JSON.parse(nonParseLSValue);
  if (parseLSValue) return parseLSValue;
  else {
    if (initValue instanceof Function) return initValue();
    return initValue;
  }
};

export default function useLocalStorage(key: string, initValue: any) {
  const [value, setValue] = useState(() => getLocalValue(key, initValue));

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}
