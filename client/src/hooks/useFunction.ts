import { useCallback } from "react";
import useError from "./useError";

export default function useFunction<F = (arg: any) => any | void>(_cb: F) {
  const error = useError();

  const cb = useCallback<F>(() => {
    try {
      return _cb;
    } catch (err) {
      error(err);
      return () => {};
    }
  }, []);

  return cb;
}
