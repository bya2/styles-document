import { useEffect } from "react";
import type { DependencyList } from "react";

export default function useLifecycle(mountOrUpdateFn: () => void, unmountFn?: () => void, deps?: DependencyList): void {
  useEffect(() => {
    if (mountOrUpdateFn) mountOrUpdateFn();

    return () => {
      if (unmountFn) unmountFn();
    };
  }, deps ?? []);
}
