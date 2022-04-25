import styles from "@styles-components/App.module.scss";
import { lazy, Suspense } from "react";
import { useRoutes } from "react-router-dom";
import Loader from "@/components/reusable/complete/AppLoader";

// CODE SPLITING
const HomePage = lazy(() => {
  return Promise.all([import("@components/pages/Home"), new Promise((resolve) => setTimeout(resolve, 500))]).then(
    ([moduleExports]) => moduleExports
  );
});
const UserPage = lazy(() => {
  return Promise.all([import("@components/pages/User"), new Promise((resolve) => setTimeout(resolve, 500))]).then(
    ([moduleExports]) => moduleExports
  );
});

const UserDocPage = lazy(() => {
  return Promise.all([import("@components/pages/User/Doc"), new Promise((resolve) => setTimeout(resolve, 100))]).then(
    ([moduleExports]) => moduleExports
  );
});

// ROUTE CONFIG
const route_items__arr = [
  {
    path: "/",
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: ":userId",
        element: <UserPage />,
        children: [
          {
            index: true,
            element: <>12</>
          },
          {
            path: ":docId",
            element: <UserDocPage />
          }
        ]
      }
    ]
  },
];

export default function App(): JSX.Element {
  const routes = useRoutes(route_items__arr);

  return (
    <div className={styles.App}>
      <header>
        <span></span>
      </header>
      <Suspense fallback={<Loader />}>
        <>{routes}</>
      </Suspense>
      <footer>
        <span></span>
      </footer>
    </div>
  );
}
