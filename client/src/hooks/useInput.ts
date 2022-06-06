import { useCallback, useState } from "react";
import { TInputChangeE } from "@/@types/event";

export default function useInput(_initValue?: string) {
  const [value, setValue] = useState<string>(_initValue ?? "");

  const onChangeListener = useCallback((e: TInputChangeE) => {
    e.stopPropagation();
    setValue(e.currentTarget.value);
  }, []);

  const handleReset = useCallback(() => {
    setValue(_initValue ?? "");
  }, []);

  const handleEmpty = useCallback(() => {
    setValue("");
  }, []);

  return [value, onChangeListener, handleReset, handleEmpty];
}
