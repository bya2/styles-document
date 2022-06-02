import styles from "@styles-components/App.module.scss";
import { lazy, Suspense } from "react";
import { useRoutes } from "react-router-dom";
import Header from "@/components/layouts/Header";
import Footer from "@/components/layouts/Footer";
import Loader from "@/components/reusable/complete/AppLoader";

const PAGE_DELAY__MS = 100;

// CODE SPLITING
const HomePage = lazy(() => {
  return Promise.all([import("@components/pages/Home"), new Promise((resolve) => setTimeout(resolve, PAGE_DELAY__MS))]).then(
    ([moduleExports]) => moduleExports
  );
});
const UserPage = lazy(() => {
  return Promise.all([import("@components/pages/User"), new Promise((resolve) => setTimeout(resolve, PAGE_DELAY__MS))]).then(
    ([moduleExports]) => moduleExports
  );
});

const UserDocPage = lazy(() => {
  return Promise.all([import("@components/pages/User/Doc"), new Promise((resolve) => setTimeout(resolve, PAGE_DELAY__MS))]).then(
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
        element: <HomePage />,
      },
      {
        path: ":userId",
        element: <UserPage />,
        children: [
          {
            index: true,
            element: <span>{"Click Documents"}</span>,
          },
          {
            path: ":docId",
            element: <UserDocPage />,
          },
        ],
      },
    ],
  },
];

// COMPONENT
export default function App(): JSX.Element {
  const routes = useRoutes(route_items__arr);

  return (
    <div className={styles.App}>
      <Header />
      <Suspense fallback={<Loader />}>
        <>{routes}</>
      </Suspense>
      <Footer />
    </div>
  );
}
