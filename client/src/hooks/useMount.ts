import useEffectOnce from "./useEffectOnce";

const useMount = (_cb: () => void): void => {
  useEffectOnce(() => {
    _cb();
  });
};

export default useMount;
