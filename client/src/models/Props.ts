import React from "react";
import { Func, AsyncFunc, Handler, StateSetter } from "./Function";
import { item, map } from "./reusables";

type ElementValue = string | number | readonly string[];

export interface Props extends Attrs, Handlers {
  children?: React.ReactNode;
  cssModule?: map<string>;
  prop__id?: string;
  prop__key?: string;
  prop__content?: string;
  prop__element?: JSX.Element | React.FC | React.FunctionComponent<React.SVGAttributes<SVGElement>>
}

export interface Attrs {
  // BASE
  id?: string;
  className?: string;
  name?: string;
  value?: ElementValue;
  tabIndex?: number;
  inlineStyle?: React.CSSProperties;

  // INPUT & TXTA
  placeholder?: string;
  readonly?: boolean;
  disabled?: boolean;
  autoFocus?: boolean;
  autoComplete?: "on" | "off";

  // INPUT
  type?: string;

  // TXTA
  rows?: number;
  defaultValue?: ElementValue;

  // BUTTON
  buttonType?: "submit" | "button" | "reset";
}

export interface Handlers {
  // CHANGE
  onChange?: Handler<React.ChangeEvent>;

  // KEY
  onKeyUp?: Handler<React.KeyboardEvent>;
  onKeyDown?: Handler<React.KeyboardEvent>;

  // MOUSE
  onMouseUp?: Handler<React.MouseEvent>;
  onMouseDown?: Handler<React.MouseEvent>;
  onMouseEnter?: Handler<React.MouseEvent>;
  onMouseLeave?: Handler<React.MouseEvent>;
  onClick?: Handler<React.MouseEvent>;

  // FOCUS
  onFocus?: Handler<React.FocusEvent>;
  onBlur?: Handler<React.FocusEvent>;

  // FORM
  onSubmit?: Handler<React.FormEvent>;
}

// Custom
export interface IResizerProps {
  prop__handler__mouse_move__box: Handler<MouseEvent>;
}

export interface IModalProps {
  prop__getter__is_actived: boolean;
  prop__setter__close_modal: Func;
}

export interface ISignContainerProps {
  prop__mode?: string;
  prop__items?: item[];
  prop__api?: AsyncFunc<any, any>;
  prop__setter__close_modal: Func;
}

export interface InputAttrs extends Attrs {
  type?: undefined | string;
  placeholder?: undefined | string;
  autoFocus?: undefined | boolean;
  autoComplete?: undefined | "on" | "off";
}

export interface ResizerProps extends Props {
  prop__handler__mouse_move__box: Handler<MouseEvent>;
}

export interface ModalProps extends Props {
  prop__getter__is_actived: boolean;
  prop__setter__close_modal: StateSetter;
}
