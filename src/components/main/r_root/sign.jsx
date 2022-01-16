import "../../../styles/main/r_root/sign.scss";
import font_awesome from "../../../icon/font_awesome.json";
import { useState } from "react";

import Login from "./login";
import LoginForm from "./login_form";
import RootSignUp from "./sign_up";

const RootSign = () => {
  // Local states
  const [state__is_click, set_state__is_click] = useState({
    sign_up: false,
    sign_in: false,
  });

  // Event Handlers
  const fn_handler__sign = (e) => {
    set_state__is_click({
      ...state__is_click,
      [e.currentTarget.name]: true,
    });
  };

  return (
    <div className="wrapper_sign">
      <div
        className={`box sign_up ${state__is_click.sign_up && "active"}`}
        name="sign_up"
        onClick={fn_handler__sign}
      >
        <i className={font_awesome.cls_icon__sign_up}></i>
        <h2>Sign Up</h2>
      </div>
      <div
        className={`box sign_in ${state__is_click.sign_in && "active"}`}
        name="sign_in"
        onClick={fn_handler__sign}
      >
        <i className={font_awesome.cls_icon__sign_in}></i>
        <h2>Sign In</h2>
      </div>

      <Login />
      <RootSignUp />
    </div>
  );
};

export default RootSign;
