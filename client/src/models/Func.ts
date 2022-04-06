export type Func<V = void> = () => V;
export type eFunc<T = any, V = void> = (e: T) => V;
export type pFunc<T = any, V = any> = (obj?: T) => Promise<V>;
export type promiseFunc<T = any, V = any> = (obj?: T) => Promise<V>;