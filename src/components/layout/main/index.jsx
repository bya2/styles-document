import "styles/layout/main.scss";

import { Routes, Route } from "react-router-dom";

import RouteRoot from "routes/root/main";
import RouteID from "routes/id/main";

export default function CompLayoutMain() {
  return (
    <Routes>
      <Route path="/" element={<RouteRoot />}></Route>
      <Route path=":id/*" element={<RouteID />}></Route>
    </Routes>
  );
}
