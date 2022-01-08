import { Outlet } from "react-router-dom";
import "../styles/main/r_root/index.scss";
import Message from "../components/main/r_root/message";
import Login from "../components/main/r_root/login";

const common_class_name = "r_root";

const RouteRoot = () => {
  return (
    <>
      <main className={common_class_name}>
        <Message />
        <Login />
      </main>
      <Outlet />
    </>
  );
};

export default RouteRoot;
