import { Outlet } from "react-router-dom";

import "../styles/main/r_root/index.scss";

// import RootSign from "../components/main/r_root/sign";

// const common_class_name = "r_root";

const Comp_route__root = () => {
  return (
    <>
      <div>ROOT_PAGE</div>
      <Outlet />
    </>
  );
};

export default Comp_route__root;
