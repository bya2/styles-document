import styles from "@styles-components/reusable/Modal.module.scss";
import { useState } from "react";
import { createPortal } from "react-dom";
import type { Props as baseProps } from "@models/Props";
import type { StateSetter } from "@/models/Function";
import Outer from "../wrapper/Outer";
import Inner from "../wrapper/Inner";
import Button from "../box/Button";

interface Props extends baseProps {
  prop__getter__is_actived: boolean;
  prop__setter__close_modal: StateSetter;
}

export default function Modal({
  children,
  prop__getter__is_actived,
  prop__setter__close_modal,
}: Props): React.ReactPortal | JSX.Element {
  // State
  // -- L
  const [s__is_mouse_down__c_btn__bool, set_s__is_mouse_down__c_btn__bool] = useState(false);

  // Event
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
          <Button
            cssModule={styles}
            className={`${styles.close} ${s__is_mouse_down__c_btn__bool ? styles.s__mouse_down : ""}`}
            prop__element={<span>X</span>}
            onMouseDown={(e) => fn_handle__mouse_down__c_btn(e)}
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
