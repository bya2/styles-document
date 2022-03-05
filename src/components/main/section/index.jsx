import "styles/main/section/index.scss";
import { Routes, Route } from "react-router-dom";
import RouteRoot from "../../../routes/root";

const routes__arr = [
  {
    key: "route-root",
    path: "/",
    component: <RouteRoot></RouteRoot>,
  },
];

const Comp_section = () => {
  return (
    <section>
      <Routes>
        <>
          {routes__arr.map((obj_route_elem) => {
            const { alt, path, element } = obj_route_elem;
            return <Route key={alt} path={path} element={element} />;
          })}
        </>
      </Routes>
    </section>
  );
};

export default Comp_section;
