import { useCallback, useState } from "react";

export interface IUseInputProps {
  key?: string;
  initValue?: string;
}

export default function useInput({ initValue }: IUseInputProps) {
  const [value, setValue] = useState(initValue || "");

  const onChangeListener = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    setValue(e.currentTarget.value);
  }, []);

  const resetHandler = () => setValue(initValue || "");

  return [value, onChangeListener, resetHandler];
}
