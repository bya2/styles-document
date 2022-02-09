import { Routes, Route } from "react-router-dom";

import "../../styles/main/index.scss";

import Section from "./section";
import LeftAside from "./aside/left";
import RightAside from "./aside/right";

const Comp_main = () => {
  return (
    <main>
      <Routes>
        <Route path="/" element={<></>}></Route>
        <Route
          path=":id/*"
          element={
            <>
              <LeftAside />
              <Section />
              <RightAside />
            </>
          }
        ></Route>
      </Routes>
    </main>
  );
};

export default Comp_main;
