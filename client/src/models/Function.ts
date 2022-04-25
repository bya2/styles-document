import type { I_map } from "./reusables";

export type T_Handler<I> = (arg: I) => void;

export type T_Setter<I = I_map> = (arg: I) => void;

export type T_Getter<O = any> = () => O;

export type T_AsyncFunc<I = any, O = void> = (arg: I) => Promise<O>

export type T_Func<I = any, O = void> = (arg: I) => O;

export type T_SameIOFunc<T> = (arg: T) => T;