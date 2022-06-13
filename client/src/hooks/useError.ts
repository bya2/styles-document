import { useCallback } from "react";

export interface IuseErrorOptions {
  isDebugger?: boolean;
}

export default function useError(options?: IuseErrorOptions) {
  return useCallback((_err: Error) => {
    let message = "";
    for (const [errKey, errValue] of Object.entries(_err)) {
      message += `${errKey}: ${errValue}\n`;
    }
    console.error(message);

    if (options?.isDebugger) {
      debugger;
    }
  }, []);
}
