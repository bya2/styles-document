import { useEffect, useState } from "react";

export interface IUseSessionStorageProps {
  key: string;
  initValue: string;
}

const getSessionStorageValue = (key: string) => {
  const unparsed = globalThis.sessionStorage.getItem(key);
  if (!unparsed) return null;

  const parsed = JSON.parse(unparsed);
  if (!parsed) throw new Error();

  return parsed;
};

export default function useSessionStorage({ key }: IUseSessionStorageProps) {
  const [value, setValue] = useState(() => getSessionStorageValue(key));

  useEffect(() => {
    globalThis.sessionStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}
