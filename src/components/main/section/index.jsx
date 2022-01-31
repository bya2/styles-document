import "../../../styles/main/section/index.scss";
import { Routes, Route } from "react-router-dom";
import PageRoot from "../../../routes/r_root";
import PageID from "../../../routes/r__id";

const routes__arr_elems = [
  {
    alt: "root",
    path: "/",
    comp: <PageRoot />,
  },
  {
    alt: "any user",
    path: ":id/*",
    elem: <PageID />,
  },
];

const Comp_section = () => {
  return (
    <section>
      <Routes>
        <>
          {routes__arr_elems.map((obj_elem) => (
            <Route
              key={obj_elem.alt}
              path={obj_elem.path}
              element={obj_elem.comp}
            />
          ))}
        </>
      </Routes>
    </section>
  );
};

export default Comp_section;
