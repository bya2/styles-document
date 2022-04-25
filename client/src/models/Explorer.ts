import { NODE_TYPE__DOCUMENT, NODE_TYPE__FOLDER } from "@/config/common";
import { I_map } from "./reusables";

export type T_root = "t_root";
export type T_folder = "t_folder";
export type T_doc = "t_document";
export type T_node = T_folder | T_doc;

export type T_ref = {
  id: string;
  name?: string;
};

export interface I_exp_node_ref {
  [key: string]: any;
  id: string;
  name: string;
}

export interface I_exp_root extends I_exp_node_ref {
  type?: T_root;
  children?: I_exp_node[];
}

export interface I_exp_node extends I_exp_node_ref {
  type: T_node;
  parent: string;
  children: string[] | I_exp_node[];
}

type FType = "nt__f";
type DType = "nt__d";
export type nodeTypes = FType | DType;

export interface expRef {
  id: string;
  // name: string;
}

export interface expRoot extends I_map<any>, expRef {}

export interface expNodeRef {
  id: string;
  name: string;
}

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

export interface InputRefCurrentMap {
  [NODE_TYPE__FOLDER]: HTMLInputElement;
  [NODE_TYPE__DOCUMENT]: HTMLInputElement;
}

// API
export interface APIParamMapOfExpNewNode {
  type: nodeTypes;
  name: string;
  r_node_id: string;
  p_node_id: string;
}
