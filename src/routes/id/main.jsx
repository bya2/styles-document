import { Outlet } from "react-router-dom";

export default function RouteRootMain() {
  return (
    <>
      <main className="route-id">
        <aside>
          <article></article>
          <article></article>
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
