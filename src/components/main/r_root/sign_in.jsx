// import "../../../styles/main/r_root/";
import { URL__SIGN_IN } from "../../../config/server";
import {
  ERROR_MESSAGE__SIGN_IN,
  ERROR_MESSAGE__SIGN_UP,
} from "../../../config/message";

import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Value
const STR_LEGEND_WRITE_AREA = "";

const arr_form_group__data = [
  {
    label_value: "ID",
    input_id: "sign_up_id",
    input_name: "id",
  },
  {
    label_value: "Password",
    input_id: "sign_up_id",
    input_name: "id",
  },
];

const SignIn = () => {
  // Local state
  const [state__obj_sign_in_info, set_state__obj_sign_in_info] = useState({
    id: "",
    password: "",
  });

  // Navigator
  const navigator = useNavigate();

  // API
  const fn_GET__sign_in = () => {
    axios
      .get(URL__SIGN_IN, state__obj_sign_in_info)
      .then((res) => {
        sessionStorage.setItem(
          "obj_user_info",
          JSON.stringify(state__obj_sign_in_info)
        );
        navigator("/doc");
        console.log(
          JSON.parse(sessionStorage.getItem("obj_user_info")).user_id
        );
        console.log(
          JSON.parse(sessionStorage.getItem("obj_user_info")).password
        );
      })
      .catch((err) => {
        console.error(`${ERROR_MESSAGE__SIGN_UP}${err}`);
      })
      .then(() => {});
  };

  // Handler
  const fn_handler__on_submit__sign_in_form = () => {
    e.preventDefault();
    fn_GET__sign_in();
  };

  return (
    <div className="sign_in_wrapper">
      <form onSubmit={fn_handler__on_submit__sign_in_form}>
        <fieldset className="form_inner__write_area">
          <legend>{STR_LEGEND_WRITE_AREA}</legend>
        </fieldset>
      </form>
    </div>
  );
};

export default SignIn;
