import "../styles/app.scss";
import { Routes, Route, Link } from "react-router-dom";
import HeaderLogo from "./header/logo";
import RouteRoot from "../routes/r_root";
import RouteUser from "../routes/r_user";
import RouteUserID from "../routes/r_user__id";
import RouteDocument from "../routes/r_doc";

const app = "ok";

const App = () => {
  return (
    <div className="app">
      <header className="header r_user r_doc">
        <Link to="/">
          <HeaderLogo />
          {/* <Route path="/doc" element={<div>A</div>}></Route> */}
        </Link>
        <Routes>
          <Route
            path="/doc"
            element={<div style={{ fontSize: "2rem" }}>A</div>}
          ></Route>
        </Routes>
      </header>
      <Routes>
        <Route path="/" element={<RouteRoot />}></Route>
        <Route path="/user/:id" element={<RouteUserID />}></Route>
        <Route path="/doc" element={<RouteDocument />}></Route>
      </Routes>
      <footer className="footer r_user">
        <p>Copyright ⓒ Bya2 All rights reserverd.</p>
        {/* <Link to="/">LINK_ROOT</Link> | <Link to="/doc">LINK_DOC</Link> |{" "} */}
      </footer>
    </div>
  );
};

export default App;
