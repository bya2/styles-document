import type { obj, cond } from "./reusables";

type FType = "F";
type DType = "D";
type nodeTypes = FType | DType;

export interface expRef {
  id: string;
  name: string;
}

export interface expRoot extends obj<any>, expRef {};

export interface expNode {
  id: string;
  name: string;
  type: nodeTypes;
  parent?: string;
  children: string[] | expNode[];
}

export interface expStorage {
  id: string;
  name: string;
  nodes: expNode[];
}

export interface expTree {
  id: string;
  name: string;
  children: expNode[];
}

export type expNodeNamesByType = {
  [type in nodeTypes]: string[];
};
