import "../styles/main/r__id/index.scss";

import DocActivityBar from "../components/main/r__id/activity_bar";
import DocSideBar from "../components/main/r_doc/side_bar";

const RouteID = () => {
  return (
    <>
      <main className="r__id">
        <aside>
          <DocActivityBar />
          <DocSideBar />
        </aside>
      </main>
    </>
  );
};

export default RouteID;
