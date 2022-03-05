import { Outlet } from "react-router-dom";

export default function RouteRoot() {
  return (
    <>
      <div>
        <form action="">
          <input type="text" />
        </form>
      </div>
      <Outlet />
    </>
  );
}
