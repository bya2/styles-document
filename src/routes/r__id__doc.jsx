import { Outlet } from "react-router-dom";
import "../styles/main/r__id__doc/index.scss";
import Elements from "../components/main/section/r__id__doc/elements";

const RouteIDDocument = () => {
  return (
    <>
      <section className="r__id__doc">
        <Elements />
      </section>
      <Outlet />
    </>
  );
};

export default RouteIDDocument;
