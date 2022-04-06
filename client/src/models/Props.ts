import React from "react";
import { IItem } from "./Common";
import type { Func, eFunc, pFunc } from "./Func";

type Children = JSX.Element | JSX.Element[];

// Common

export interface IProps {
  className?: string;
  prop__key?: string;
  prop__content?: string;
}

export interface IWrapperProps {
  children?: React.ReactNode;
}

export interface IAttrProps {
  className?: undefined | string;
  id?: undefined | string;
  name?: undefined | string;
  value?: undefined | string | number | readonly string[];
  placeholder?: undefined | string;
  disabled?: undefined | boolean;
  tabIndex?: undefined | number;
  style?: undefined | React.CSSProperties;
}

export interface IInputAttrProps extends IAttrProps{
  type?: undefined | string;
  placeholder?: undefined | string;
  autoFocus?: undefined | boolean;
  autoComplete?: undefined | "on" | "off";
}

export interface IButtonAttrProps {
  className?: undefined | string;
  type: "submit" | "button" | "reset" | undefined;
  value: string;
}

export interface IHandlerProps {
  onChange?: eFunc<React.ChangeEvent>
  onKeyUp?: eFunc<React.KeyboardEvent>
  onKeyDown?: eFunc<React.KeyboardEvent>
  onMouseUp?: eFunc<React.MouseEvent>
  onMouseDown?: eFunc<React.MouseEvent>
  onClick?: eFunc<React.MouseEvent>
  onFocus?: eFunc<React.FocusEvent>
  onBlur?: eFunc<React.FocusEvent>
  onSubmit?: eFunc<React.FormEvent>
}

export interface ICommonProps extends IWrapperProps {
}

export interface IReusableProps extends IWrapperProps, IAttrProps, IHandlerProps {
}

// Custom
export interface IResizerProps {
  prop__handler__mouse_move__box: eFunc<MouseEvent>;
}

export interface IModalProps {
  prop__getter__is_actived: boolean;
  prop__setter__close_modal: Func;
}

export interface ISignContainerProps {
  prop__mode?: string;
  prop__items: IItem[];
  prop__api: pFunc<any>;
  prop__setter__close_modal: Func;
}


export interface Attrs {
  className?: undefined | string;
  id?: undefined | string;
  name?: undefined | string;
  value?: undefined | string | number | readonly string[];
  placeholder?: undefined | string;
  disabled?: undefined | boolean;
  tabIndex?: undefined | number;
  style?: undefined | React.CSSProperties;
}

export interface InputAttrs extends Attrs{
  type?: undefined | string;
  placeholder?: undefined | string;
  autoFocus?: undefined | boolean;
  autoComplete?: undefined | "on" | "off";
}

export interface EventHandlers {
  onChange?: eFunc<React.ChangeEvent>
  onKeyUp?: eFunc<React.KeyboardEvent>
  onKeyDown?: eFunc<React.KeyboardEvent>
  onMouseUp?: eFunc<React.MouseEvent>
  onMouseDown?: eFunc<React.MouseEvent>
  onClick?: eFunc<React.MouseEvent>
  onFocus?: eFunc<React.FocusEvent>
  onBlur?: eFunc<React.FocusEvent>
  onSubmit?: eFunc<React.FormEvent>
}

export interface Props {
  children?: Children;
}

export interface ResizerProps extends Props {
  prop__fn_handle__mouse_move__box: eFunc<MouseEvent>;
}


export interface ModalProps extends Props {
  prop__getter__is_actived: boolean;
  prop__setter__close_modal: Func;
}



// Reusable
// -- Unit1
export interface ContainerProps extends Props, Attrs, EventHandlers {};

// -- Element
export interface FormProps extends Props, Attrs, EventHandlers {};
export interface FieldsetProps extends Props, Attrs {
  prop__legend?: string;
}
export interface InputProps extends InputAttrs, EventHandlers {};
export interface UListProps extends Props, Attrs {};
export interface ItemProps extends Props, Attrs {};