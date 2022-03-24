import styles from "@styles-components/App.module.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "@pages/home";
import IDPage from "@pages/id";

export default function App() {
  return (
    <BrowserRouter>
      <div className={styles.App}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path=":id/*" element={<IDPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
