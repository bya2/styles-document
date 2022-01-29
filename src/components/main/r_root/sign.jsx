import { useState } from "react";

import "../../../styles/main/r_root/sign.scss";
import font_awesome from "../../../icon/font_awesome.json";
import Modal from "../../resusing/modal";
import SignUp from "../../session/sign_up";
import SessionSignIn from "../../session/sign_in";

const RootSign = () => {
  // Local states
  const [state__is_click_sign, set_state__is_click_sign] = useState({
    sign_up: false,
    sign_in: false,
  });
  const { sign_up, sign_in } = state__is_click_sign;

  // Event Handlers
  const fn_handler__on_click__sign = (e) => {
    console.log(e.currentTarget.getAttribute("name"));
    set_state__is_click_sign({
      ...state__is_click_sign,
      [e.currentTarget.getAttribute("name")]: true,
    });
  };

  const fn_handler__on_click__close_modal_button = (e) => {
    set_state__is_click_sign({
      ...state__is_click_sign,
      sign_up: false,
      sign_in: false,
    });
  };

  return (
    <div className="wrapper_sign">
      <div
        className={`box sign_up ${sign_up && "active"}`}
        name="sign_up"
        onClick={fn_handler__on_click__sign}
      >
        <i className={font_awesome.cls_icon__sign_up}></i>
        <h2>Sign Up</h2>
      </div>
      <div
        className={`box sign_in ${sign_in && "active"}`}
        name="sign_in"
        onClick={fn_handler__on_click__sign}
      >
        <i className={font_awesome.cls_icon__sign_in}></i>
        <h2>Sign In</h2>
      </div>

      {/* This is Modal */}
      <Modal
        state__is_click__elem={state__is_click_sign.sign_up}
        fn_setter__state__close_modal={fn_handler__on_click__close_modal_button}
        name="sign_up"
      >
        <SignUp />
      </Modal>

      <Modal
        state__is_click__elem={state__is_click_sign.sign_in}
        fn_setter__state__close_modal={fn_handler__on_click__close_modal_button}
        name="sign_in"
      >
        <SessionSignIn />
      </Modal>
    </div>
  );
};

export default RootSign;
