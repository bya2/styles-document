import "../styles/app.scss";

// import Header from "./header";
// import Main from "./main";
// import Footer from "./footer";

import Header from "components/layout/header";
import Main from "components/layout/main";
import Footer from "components/layout/footer";

const App = () => {
  return (
    <div className="app">
      <Header />
      <Main />
      <Footer />
    </div>
  );
};

export default App;
