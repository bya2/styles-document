import {
  ButtonHTMLAttributes,
  FieldsetHTMLAttributes,
  FormEventHandler,
  FormHTMLAttributes,
  HTMLAttributes,
  InputHTMLAttributes,
  LabelHTMLAttributes,
  LiHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";
import { I_map } from "./reusables";

export interface I_bs_props {
  cssModule?: I_map<string>;
  style_obj?: I_map<string>;
  inlineStyle?: React.CSSProperties;
  prop__id?: string;
  prop__title?: string;
  prop__sub_title?: string;
  prop__content?: string;
  prop__legend?: string;
  prop__volume?: number;
  prop__element?: JSX.Element | React.FC | React.FunctionComponent<React.SVGAttributes<SVGElement>>;
}

export interface I_re_props {
  style_obj: I_map<string>;
  _class?: string;
  _classes?: string;
  _image?: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
  _alt?: string;
  _content?: string;
  _title?: string;
  _legend?: string;
  _element?: JSX.Element | React.FC;
}

export interface I_div_props extends HTMLAttributes<HTMLDivElement> {}
export interface I_ul_props extends HTMLAttributes<HTMLUListElement> {}
export interface I_li_props extends LiHTMLAttributes<HTMLLIElement> {}
export interface I_form_props extends FormHTMLAttributes<HTMLFormElement> {}
export interface I_btn_props extends ButtonHTMLAttributes<HTMLButtonElement> {}

export interface I_div_attrs extends HTMLAttributes<HTMLDivElement> {}
export interface I_ul_attrs extends HTMLAttributes<HTMLUListElement> {}
export interface I_li_attrs extends LiHTMLAttributes<HTMLLIElement> {}
export interface I_form_attrs extends FormHTMLAttributes<HTMLFormElement> {}
export interface I_btn_attrs extends ButtonHTMLAttributes<HTMLButtonElement> {}
export interface I_label_attrs extends LabelHTMLAttributes<HTMLLabelElement> {}
export interface I_input_attrs extends InputHTMLAttributes<HTMLInputElement> {}

export interface I_inp_grp_props {
  _class: string;
  _id: string;
  _label: string;
  label_attrs?: I_label_attrs;
  input_attrs?: I_input_attrs;
}

export interface I_div_bs_props extends I_bs_props, HTMLAttributes<HTMLDivElement> {}
export interface I_ul_bs_props extends I_bs_props, HTMLAttributes<HTMLUListElement> {}
export interface I_li_bs_props extends I_bs_props, LiHTMLAttributes<HTMLLIElement> {}
export interface I_inp_bs_props extends I_bs_props, InputHTMLAttributes<HTMLInputElement> {}
export interface I_txa_bs_props extends I_bs_props, TextareaHTMLAttributes<HTMLTextAreaElement> {}
export interface I_btn_bs_props extends I_bs_props, ButtonHTMLAttributes<HTMLButtonElement> {}
export interface I_fs_bs_props extends I_bs_props, FieldsetHTMLAttributes<HTMLFieldSetElement> {}
export interface I_form_bs_props extends I_bs_props, FormHTMLAttributes<HTMLFormElement> {}
