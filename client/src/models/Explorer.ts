import type { obj } from "./reusables";

type FType = "nt__f";
type DType = "nt__d";
type nodeTypes = FType | DType;

export interface expRef {
  id: string;
  // name: string;
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
  children: expNode[];
}

export type expNodeNamesByType = {
  [type in nodeTypes]: string[];
};
