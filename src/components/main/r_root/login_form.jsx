import axios from "axios";
import qs from "qs";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const STR_SCHEME = process.env.REACT_APP_SCHEME || "http";
const STR_HOST = process.env.REACT_APP_HOST || "localhost";
const STR_PORT = process.env.REACT_APP_PORT || 8080;
const STR_ENDPOINT = process.env.REACT_APP_ENDPOINT || "/api/login";
const STR_URL = `${STR_SCHEME}://${STR_HOST}:${STR_PORT}${STR_ENDPOINT}`

const LoginForm = () => {
  // Local states
  const [state__obj_user_info, set_state__obj_user_info] = useState({ user_id: "", password: "" });

  // Navigator
  const navigator = useNavigate();

  // Event funtions
  const fn_handler__on_submit__login_form = (e) => {
    e.preventDefault();
    axios.get(STR_URL, { params: state__obj_user_info })
      .then(res => {
        switch (res.status) {
          case 200:
            sessionStorage.setItem("obj_user_info", JSON.stringify(state__obj_user_info));
            navigator("/doc");
            console.log(JSON.parse(sessionStorage.getItem("obj_user_info")).user_id);
            console.log(JSON.parse(sessionStorage.getItem("obj_user_info")).password);
            break;
          default:
            // code
        }
      })
      .catch(err => {
        console.error(`LoginForm.fn_on_submit__login_form (axios.post)\n${err}`);
      })
      .then(() => {

      });
  }

  const fn_handler__on_change__login_input = (e) => {
    set_state__obj_user_info({
      ...state__obj_user_info,
      [e.target.name]: e.target.value,
    });
  }

  return (
    <form onSubmit={fn_handler__on_submit__login_form}>
      <div className="form_inner">
        <div className="form_group">
          <label htmlFor="login_input_user_id"></label>
          <input type="text" id="login_input_user_id" name="user_id" onChange={fn_handler__on_change__login_input}/>
        </div>
        <div className="form_group">
          <label htmlFor="login_input_password"></label>
          <input type="text" id="login_input_password" name="password" onChange={fn_handler__on_change__login_input}/>
        </div>
      </div>
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
