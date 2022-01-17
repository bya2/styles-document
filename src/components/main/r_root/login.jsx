import { Link } from "react-router-dom";
import "../../../styles/main/r_root/login.scss";
import LoginForm from "./login_form";

import logo_192 from "../../../image/bya-logo-192.png";
import logo_320 from "../../../image/bya-logo-320.png";

const logo_img = {
  src: logo_192,
  srcSet: `${logo_192} 192w, ${logo_320} 320w`,
  alt: "Logo Image",
};

const Login = () => {
  return (
    <div className="container_login r_root">
      <p>Login</p>
      <hr />
      <LoginForm />
    </div>
  );
};

export default Login;
