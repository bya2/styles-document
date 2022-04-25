import React from "react";
import { T_Getter, T_Setter } from "./function";

export interface I_map<T = any> {
  [key: string]: T;
}

export interface I_id_map extends I_map<string> {}
export interface I_cond_map extends I_map<boolean> {}

export interface I_obj {
  // [key: string]: any;
  id: string;
  name?: string;
  content?: string;
  SVG?: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
  // element?: JSX.Element | React.FC | React.FunctionComponent<React.SVGAttributes<SVGElement>>;
  // Icon?: JSX.Element | React.FC | React.FunctionComponent<React.SVGAttributes<SVGElement>>;
  items?: I_obj[];
  occured_at?: string | Date;
  setter?: T_Setter;
  getter?: T_Getter;
  api?: (obj?: any) => Promise<any>;
}