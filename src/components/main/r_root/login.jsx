import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../../../styles/main/r_root/login.scss";
import logo_192 from "../../../image/bya-logo-192.png";
import logo_320 from "../../../image/bya-logo-320.png";

const logo_img = {
  src: logo_192,
  srcSet: `${logo_192} 192w, ${logo_320} 320w`,
  alt: "Logo Image",
};

const Login = () => {
  const [state__obj_user_info, set__state__obj_user_info] = useState({
    user_id: "",
  });
  const { user_id: state__user_id } = state__obj_user_info;

  const on_change__login_id_input = (e) => {
    set__state__obj_user_info({
      ...state__obj_user_info,
      [e.target.name]: e.target.value,
    });
    console.log(state__user_id);
  };

  const on_click__login_button = async () => {
    const URL = process.env.REQUEST_LOGGING_IN || "http://127.0.0.1/login";
    const res = await axios.get(URL, { params: state__obj_user_info });
    if (res.status === 200) {
      const obj_user_info = res.json();
    }

    const { data } = res;
    console.log(data);
  };

  // const on_submit__login_form = async () => {
  //   const URL = process.env.REQUEST_LOGGING_IN || "http://127.0.0.1/login";
  //   const res = await axios.get(URL, { params: state__obj_user_info });
  //   if (res.status === 200) {
  //     const obj_user_info = res.json();
  //   }

  //   const { data } = res;
  //   console.log(data);
  // };

  return (
    <div className="container_login r_root">
      <p>Login</p>
      <hr />
      <Link to="/">
        <img src={logo_img.src} srcSet={logo_img.srcSet} alt={logo_img.alt} />
      </Link>
      <hr />
      {/* <form onSubmit={on_submit__login_form}>
        <input
          type="text"
          name="user_id"
          placeholder="아이디"
          onChange={on_change__login_id_input}
          value={state__user_id}
        />
        <button type="submit">Connect</button>
      </form> */}
      <div className="form">
        <input
          type="text"
          name="user_id"
          id="user_id"
          placeholder="아이디"
          onChange={on_change__login_id_input}
          value={state__user_id}
        />
        <button onClick={on_click__login_button}>Connect</button>
      </div>
    </div>
  );
};

export default Login;
