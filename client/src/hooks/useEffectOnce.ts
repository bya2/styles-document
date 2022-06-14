import { useEffect } from "react";
import type { EffectCallback } from "react";

const useEffectOnce = (_cb: EffectCallback): void => {
  useEffect(_cb, []);
};

export default useEffectOnce;
