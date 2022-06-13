import useLocalStorage from "./useLocalStorage";

export default function useToggle(key: string, initValue?: boolean) {
  const [value, setValue] = useLocalStorage<boolean>(key, initValue);

  const toggle = () => setValue((prev) => !prev);

  return [value, toggle];
}
