import { useRef } from "react";
import useEffectOnce from "./useEffectOnce";

const useUnmount = (_fn: () => any): void => {
  const fnRef = useRef(_fn);
  fnRef.current = _fn;
  useEffectOnce(() => () => fnRef.current());
};

export default useUnmount;
