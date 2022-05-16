import useLocalStorage from "./useLocalStorage";

export default function useToggle(key: string, initValue: any) {
  const [value, setValue] = useLocalStorage(key, initValue);

  const setToggle = (_value: any) => {
    setValue((_prev: any) => {
      return typeof value === "boolean" ? _value : !_prev;
    });
  };

  return [value, setToggle];
}
