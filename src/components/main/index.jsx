import { Routes, Route } from "react-router-dom";

import "../../styles/main/index.scss";

import RouteRoot from "../../routes/r_root";
import RouteID from "../../routes/r__id";

const arr_routes = [
  {
    alt: "root",
    path: "/",
    elem: <RouteRoot />,
  },
  {
    alt: "any user",
    path: ":id/*",
    elem: <RouteID />,
  },
];

const Comp_main = () => {
  return (
    <main>
      <Routes>
        <>
          {arr_routes.map((route) => (
            <Route key={route.alt} path={route.path} element={route.elem} />
          ))}
        </>
      </Routes>
    </main>
  );
};

export default Comp_main;
