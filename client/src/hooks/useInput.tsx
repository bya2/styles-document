import { useCallback, useState } from "react";

export default function useInput(initValue: string) {
  const [value, setValue] = useState<string>(initValue);

  const setReset = () => setValue(initValue);

  const onChangeListener = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    setValue(e.currentTarget.value);
  }, []);

  return [value, setReset, onChangeListener];
}

// export default function useInput(key: string, initValue: any) {
//   const [value, setValue] = useLocalStorage(key, initValue);

//   const setReset = () => setValue(initValue);

//   const onChangeListener = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
//     e.stopPropagation();
//     setValue(e.currentTarget.value);
//   }, []);

//   return [value, onChangeListener, setReset];
// }
