import styles from "@styles-components/Modal.module.scss";
import { useState } from "react";
import { createPortal } from "react-dom";
import Outer from "../wrapper/Outer";
import Inner from "../wrapper/Inner";
import Button from "../box/Button";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { set_s__status__close_modal } from "@/store/reusable/modal";
import BtnBox from "../box/Button";
import CloseIcon from "@/assets/icon/explorer/close-outline.svg";

interface I_props {
  children: React.ReactNode;
  prop__getter__is_actived: boolean;
  prop__setter__close_modal: () => void;
}

export default function Modal({
  children,
  prop__getter__is_actived,
  prop__setter__close_modal,
}: I_props): React.ReactPortal | JSX.Element {
  // STATE
  const [s__is_mouse_down__c_btn__bool, set_s__is_mouse_down__c_btn__bool] = useState(false);

  // HANDLER
  const fn_handle__mouse_down__outer = (e: React.MouseEvent): void => {
    e.stopPropagation();
    e.currentTarget.addEventListener("mouseup", () => prop__setter__close_modal(), { once: true });
  };

  const fn_handle__mouse_down__c_btn = (e: React.MouseEvent): void => {
    e.stopPropagation();
    set_s__is_mouse_down__c_btn__bool(true);
    window.addEventListener(
      "mouseup",
      () => {
        set_s__is_mouse_down__c_btn__bool(false);
        prop__setter__close_modal();
      },
      { once: true }
    );
  };

  return prop__getter__is_actived ? (
    createPortal(
      <Outer cssModule={styles} onMouseDown={(e) => fn_handle__mouse_down__outer(e)} onMouseUp={(e) => {}}>
        <Inner cssModule={styles} onMouseDown={(e) => e.stopPropagation()}>
          <BtnBox
            style_obj={styles}
            className={"close"}
            _class={s__is_mouse_down__c_btn__bool ? styles.s__mouse_down : ""}
            onMouseDown={(e) => fn_handle__mouse_down__c_btn(e)}
            _image={CloseIcon}
          />
          <div>{children}</div>
        </Inner>
      </Outer>,
      document.getElementById("modal") as HTMLElement
    )
  ) : (
    <></>
  );
}
