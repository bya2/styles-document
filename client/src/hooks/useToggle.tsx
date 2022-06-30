import { useReducer } from "react";
import useLocalStorage from "./useLocalStorage";
import type { Reducer } from "react";

const useToggleReducer = (currState: boolean, nextState?: boolean): boolean => nextState ?? !currState;

const useToggle = (key: string, initialState: boolean): [boolean, React.Dispatch<boolean>] => {
  return useReducer<Reducer<boolean, any>>(useToggleReducer, initialState);
};

export default useToggle;
