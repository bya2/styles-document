import { Routes, Route, Outlet } from "react-router-dom";

import "../styles/main/r__id/index.scss";

// import UserActivityBar from "../components/main/r__id/activity_bar";
import UserSideBar from "../components/main/r__id/side_bar";
import RouteIDDocument from "./r__id__doc";

const RouteID = () => {
  return (
    <>
      <main className="r__id">
        <aside>
          {/* <UserActivityBar /> */}
          <UserSideBar />
        </aside>
        <Routes>
          <Route path="/:doc" element={<RouteIDDocument />}></Route>
        </Routes>
      </main>
      <Outlet />
    </>
  );
};

export default RouteID;
