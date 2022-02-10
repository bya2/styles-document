import "../../../styles/main/section/index.scss";
import { Routes, Route } from "react-router-dom";
import PageRoot from "../../../routes/r_root";
import PageID from "../../../routes/r__id";
import PageIDDoc from "../../../routes/r__id__doc";

const routes__arr_elems = [
  {
    alt: "node__root",
    path: "/",
    element: <PageRoot />,
  },
  {
    alt: "node__sub",
    path: ":doc",
    element: <PageIDDoc />,
  },
];

const Comp_section = () => {
  return (
    <section>
      <Routes>
        <>
          {routes__arr_elems.map((obj_route_elem) => {
            const { alt, path, element } = obj_route_elem;
            return <Route key={alt} path={path} element={element} />;
          })}
        </>
      </Routes>
    </section>
  );
};

export default Comp_section;
