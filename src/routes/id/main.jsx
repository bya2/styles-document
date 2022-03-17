import { Outlet } from "react-router-dom";

import Explorer from "components/layout/main/explorer";
import Resizer from "components/reusable/_resizer";

export default function RouteRootMain() {
  return (
    <>
      <main className="route-id">
        <aside>
          <article className="">
            <span>{"EXPLORER"}</span>
          </article>
          <Explorer />
        </aside>
        <Resizer />
        <section>
          <article></article>
          <article></article>
        </section>
      </main>
      <Outlet />
    </>
  );
}
