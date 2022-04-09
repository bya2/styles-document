import styles from "@styles-components/App.module.scss";
import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Loader from "@components/reusable/complete/Loader";

// CODE SPLITING
const HomePage = lazy(() => {
  return Promise.all([import("@components/pages/Home"), new Promise((resolve) => setTimeout(resolve, 1000))]).then(
    ([moduleExports]) => moduleExports
  );
});
const UserPage = lazy(() => {
  return Promise.all([import("@components/pages/User"), new Promise((resolve) => setTimeout(resolve, 1000))]).then(
    ([moduleExports]) => moduleExports
  );
});

// ROUTE CONFIG
const route_items__arr = [
  {
    id: "route__home",
    path: "/",
    Page: HomePage,
  },
  {
    id: "route__user",
    path: "/:param__user_id/*",
    Page: UserPage,
  },
];

export default function App(): JSX.Element {
  return (
    <div className={styles.App}>
      <Routes>
        {route_items__arr.map((route_item__obj) => {
          const { id, path, Page } = route_item__obj;
          return (
            <Route
              key={id}
              path={path}
              element={
                <Suspense fallback={<Loader prop__content={"Loading..."}/>}>
                  <Page />
                </Suspense>
              }
            />
          );
        })}
      </Routes>
    </div>
  );
}
