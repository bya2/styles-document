import { useEffect, useCallback } from "react";
import useSessionStorage from "./useSessionStorage";

const getWindowScroll = (): { x: number; y: number } => {
  return {
    x: window.scrollX,
    y: window.scrollY,
  };
};

const useScroll = (_key: string) => {
  const [state, setState] = useSessionStorage(_key, getWindowScroll());

  const onScroll = useCallback(() => {
    setState(getWindowScroll());
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return state;
};

export default useScroll;
