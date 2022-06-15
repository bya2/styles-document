import { useCallback, useEffect, useState } from "react";

export interface IHookErrorOptions {
  isDebugger?: boolean;
}

const useError = (errOpts?: IHookErrorOptions): ((err: Error) => void) => {
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (error) {
      handleError(error);
      throw error;
    }
  }, [error]);

  const handleError = useCallback((err: Error) => {
    let message = "";
    for (const [optKey, optVal] of Object.entries(err)) {
      message += `${optKey}: ${optVal}\n`;
    }
    console.error(message);

    if (errOpts?.isDebugger) {
      debugger;
    }
  }, []);

  const dispatchError = useCallback((err: Error) => {
    setError(err);
  }, []);

  return dispatchError;
};

export default useError;
