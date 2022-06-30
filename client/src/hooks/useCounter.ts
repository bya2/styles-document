import { useState } from "react";

export interface CounterActions {
  set: React.Dispatch<React.SetStateAction<number>>;
  inc: (n?: number) => void;
  dec: (n?: number) => void;
  reset: () => void;
}

const useCounter = (_initialState: number = 0, max?: number, min?: number): [number, CounterActions] => {
  const [s, set] = useState<number>(_initialState);
  const inc = (_n: number = 1): void => set((_s) => _s + _n);
  const dec = (_n: number = 1): void => set((_s) => _s - _n);
  const reset = () => set(_initialState);
  return [s, { set, inc, dec, reset }];
};

export default useCounter;
