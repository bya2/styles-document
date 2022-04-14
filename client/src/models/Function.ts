import type { obj } from "./reusables";

export type Handler<T> = (arg: T) => void;

export type Setter<I = obj> = (arg: I) => void;
export type Getter<O = any> = () => O;
export type PromiseGetter<O = any> = () => Promise<O>;

export type Func<I = any, O = void> = (arg: I) => O;
export type AsyncFunc<I = any, O = void> = (arg: I) => Promise<O>;

export type NoneIOFunc = () => void;
export type SameIOFunc<T> = (arg: T) => T;

export type StateSetter<T = obj> = (arg?: T) => void; 