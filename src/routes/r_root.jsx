import { Outlet } from "react-router-dom";

import "../styles/main/r_root/index.scss";

// import RootSign from "../components/main/r_root/sign";

// const common_class_name = "r_root";

const RouteRoot = () => {
  return (
    <>
      <div></div>
      <Outlet />
    </>
  );
};

export default RouteRoot;
