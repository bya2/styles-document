import type { promiseFunc } from "./Func";

export interface obj<T = any> {
  [key: string]: T;
}

export interface cond {
  [key: string]: boolean;
};

export interface item extends obj{
  id: string;
  name?: string;
  content?: string;
  icon?: string;
  items?: item[];
  api?: promiseFunc;
}