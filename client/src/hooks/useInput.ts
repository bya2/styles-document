import { useCallback, useState } from "react";
import type { TInputChangeE } from "@/@types/event";

export default function useInput(_initValue?: string) {
  const [input, setInput] = useState<string>(_initValue ?? "");

  const inputChangeListener = useCallback((e: TInputChangeE) => {
    e.stopPropagation();
    setInput(e.currentTarget.value);
  }, []);

  const resetInput = useCallback(() => {
    setInput(_initValue ?? "");
  }, []);

  const emptyInput = useCallback(() => {
    setInput("");
  }, []);

  return [input, inputChangeListener, resetInput, emptyInput];
}
