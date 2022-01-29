// import { Link } from "react-router-dom";

import "../../styles/header/index.scss";

import Menu from "./menu";
import Logo from "./logo";
import Session from "./session";

const Comp_header = () => {
  return (
    <header>
      <Menu />
      <Logo />
      <Session />
    </header>
  );
};
export default Comp_header;
