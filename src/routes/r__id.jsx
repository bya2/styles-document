import { Routes, Route, Outlet } from "react-router-dom";
import "../styles/main/r__id/index.scss";
import Tool from "../components/main/aside/left/explorer/tool";
import Layer from "../components/main/aside/left/explorer/layer";
import RouteIDDocument from "./r__id__doc";

const RouteID = () => {
  return (
    <>
      {/* <Routes>
        <Route
          path="/"
          element={
            <>
              <Tool />
              <hr />
              <nav
                className="layer_tree_root"
                tabIndex="0"
                onClick={() => set_state__is_click__root(true)}
                onBlur={() => set_state__is_click__root(false)}
              >
                <Layer state__is_click__root={state__is_click__root} />
              </nav>
            </>
          }
        />
        <Route path=":doc" element={<RouteIDDocument />} />
      </Routes>
      <Outlet /> */}
    </>
  );
};

export default RouteID;
