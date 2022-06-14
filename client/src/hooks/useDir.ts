import { useState, useMemo } from "react";

export interface Actions<T extends object> {
  set: (newDir: T) => void;
  upsert: <K extends keyof T>(key: K, value: T[K]) => void;
  remove: <K extends keyof T>(key: K) => void;
}

const useDir = <T extends object = any>(_initDir: T = {} as T): [T, Actions<T>] => {
  const [dir, set] = useState<T>(_initDir);

  const actions = useMemo<Actions<T>>(
    () => ({
      set: (newDir: T) => {
        set(newDir);
      },
      upsert: (key, value) => {
        set((prevDir) => {
          return {
            ...prevDir,
            [key]: value,
          };
        });
      },
      remove: (key) => {
        set((prevDir) => {
          const { [key]: omit, ...rest } = prevDir;
          return rest as T;
        });
      },
    }),
    [] // <-? set
  );

  return [dir, actions];
};

export default useDir;
