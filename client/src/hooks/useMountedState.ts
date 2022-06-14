import { useEffect, useCallback, useRef } from "react";

const useMountedState = (): (() => boolean) => {
  const stateRef = useRef<boolean>(false);
  const getState = useCallback(() => stateRef.current, []);

  useEffect(() => {
    stateRef.current = true;

    return () => {
      stateRef.current = false;
    };
  }, []);

  return getState;
};

export default useMountedState;
