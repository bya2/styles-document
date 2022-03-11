import { Outlet } from "react-router-dom";
import CompSearch from "components/search";

export default function RouteRootMain() {
  return (
    <>
      <main className="route-root">
        <div>
          <span>Document</span>
        </div>
        <div>
          <CompSearch />
        </div>
        <div></div>
      </main>
      <Outlet />
    </>
  );
}