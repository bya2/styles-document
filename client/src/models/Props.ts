import {
  ButtonHTMLAttributes,
  FieldsetHTMLAttributes,
  FormEventHandler,
  FormHTMLAttributes,
  HTMLAttributes,
  InputHTMLAttributes,
  LiHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";
import { I_map } from "./reusables";

export interface I_bs_props {
  cssModule?: I_map<string>;
  inlineStyle?: React.CSSProperties;
  prop__id?: string;
  prop__title?: string;
  prop__sub_title?: string;
  prop__content?: string;
  prop__legend?: string;
  prop__volume?: number;
  prop__element?: JSX.Element | React.FC | React.FunctionComponent<React.SVGAttributes<SVGElement>>;
}

export interface I_div_bs_props extends I_bs_props, HTMLAttributes<HTMLDivElement> {}
export interface I_ul_bs_props extends I_bs_props, HTMLAttributes<HTMLUListElement> {}
export interface I_li_bs_props extends I_bs_props, LiHTMLAttributes<HTMLLIElement> {}
export interface I_inp_bs_props extends I_bs_props, InputHTMLAttributes<HTMLInputElement> {}
export interface I_txa_bs_props extends I_bs_props, TextareaHTMLAttributes<HTMLTextAreaElement> {}
export interface I_btn_bs_props extends I_bs_props, ButtonHTMLAttributes<HTMLButtonElement> {}
export interface I_fs_bs_props extends I_bs_props, FieldsetHTMLAttributes<HTMLFieldSetElement> {}
export interface I_form_bs_props extends I_bs_props, FormHTMLAttributes<HTMLFormElement> {}
