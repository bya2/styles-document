// import { Routes, Route } from "react-router-dom";

import "../../styles/main/index.scss";

import Section from "./section";
import LeftAside from "./aside/left";
import RightAside from "./aside/right";

const Comp_main = () => {
  return (
    <main>
      <LeftAside />
      <Section />
      <RightAside />
    </main>
  );
};

export default Comp_main;
