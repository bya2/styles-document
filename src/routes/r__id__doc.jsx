import { Outlet } from "react-router-dom";

import "../styles/main/r__id__doc/index.scss";

import ElemList from "../components/main/r__id__doc/elem_list";
import ElemTypeSelector from "../components/main/r__id__doc/elem_type_selector";

const RouteIDDocument = () => {
  return (
    <>
      <section className="r__id__doc">
        <ElemList />
        <ElemTypeSelector />
      </section>
      <Outlet />
    </>
  );
};

export default RouteIDDocument;
