import { useCallback, useState } from "react";
import type { TInputChangeE, TInputKeyE } from "@/@types/event";

export default function useInput(_initValue?: string) {
  const [input, setInput] = useState<string>(_initValue ?? "");

  const inputChangeListener = useCallback((e: TInputChangeE) => {
    e.stopPropagation();
    setInput(e.currentTarget.value);
  }, []);

  return [input, setInput, inputChangeListener] as [
    string,
    React.Dispatch<React.SetStateAction<string>>,
    (e: TInputChangeE) => void
  ];
}
