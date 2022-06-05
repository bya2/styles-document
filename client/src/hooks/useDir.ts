import { useEffect, useState } from "react";

export interface IBoolDir {
  [key: string]: boolean;
}

export default function useDir<T>(_arr: T[], _prop: string) {
  const [dir, setDir] = useState({});

  useEffect(() => {
    const tmpDir = _arr.reduce((_dir: IBoolDir, _obj: any) => {
      _dir[_obj[_prop]] = false;
      return _dir;
    }, {});

    setDir(tmpDir);
  }, []);

  const add = () => {};

  const remove = () => {};

  return [dir, add, remove];
}
