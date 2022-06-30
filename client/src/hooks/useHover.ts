import { useState, cloneElement } from "react";
import type React from "react";
import { noop } from "@/misc/utils";

export type ElementType = React.ReactElement<any> | ((state: boolean) => React.ReactElement<any>);

const useHover = (_elem: ElementType): [React.ReactElement<any>, boolean] => {
  const [state, setState] = useState<boolean>(false);

  const onMouseEnter = (_originalOnMouseEvent: any) => (_e: any) => {
    (_originalOnMouseEvent || noop)(_e);
    setState(true);
  };

  const onMouseLeave = (_originalOnMouseEvent: any) => (_e: any) => {
    (_originalOnMouseEvent || noop)(_e);
    setState(false);
  };

  if (typeof _elem === "function") {
    _elem = _elem(state);
  }

  const elem = cloneElement(_elem, {
    onMouseEnter: onMouseEnter(_elem.props.onMouseEnter),
    onMouseLeave: onMouseLeave(_elem.props.onMouseLeave),
  });

  return [elem, state];
};

export default useHover;
