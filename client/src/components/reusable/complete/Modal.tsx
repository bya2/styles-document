import styles from "@styles-components/reusable/Modal.module.scss";
import { useState } from "react";
import { createPortal } from "react-dom";
import type { Props as baseProps } from "@models/Props";
import type { StateSetter } from "@/models/Function";

interface Props extends baseProps {
  prop__getter__is_actived: boolean;
  prop__setter__close_modal: StateSetter;
}

export default function Modal({ children, prop__getter__is_actived, prop__setter__close_modal }: Props): React.ReactPortal | JSX.Element {
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
      <div className={styles.outer} onMouseDown={(e) => fn_handle__mouse_down__outer(e)} onMouseUp={(e) => {}}>
        <div className={styles.inner} onMouseDown={(e) => e.stopPropagation()}>
          <button
            className={`${styles.inner__btn__close} ${s__is_mouse_down__c_btn__bool ? styles.s__mouse_down : ""}`}
            onMouseDown={(e) => fn_handle__mouse_down__c_btn(e)}
          >
            <i className={`${styles.icon__close} ${"fa"}`}>X</i>
          </button>

          <div>{children}</div>
        </div>
      </div>,
      document.getElementById("modal") as HTMLElement
    )
  ) : <></>;
}
