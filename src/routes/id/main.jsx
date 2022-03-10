import { Outlet } from "react-router-dom";

import CompExplorer from "components/layout/main/explorer";

export default function RouteRootMain() {
  return (
    <>
      <main className="route-id">
        <aside>
          <article className="">
            <span>{"EXPLORER"}</span>
          </article>
          <CompExplorer />
        </aside>
        <section>
          <article></article>
          <article></article>
        </section>
      </main>
      <Outlet />
    </>
  );
}
