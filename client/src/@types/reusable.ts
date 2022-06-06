export type TOrU<T> = T | undefined;

export interface IDir<T> {
  [key: string]: T;
}