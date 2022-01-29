import { Link } from "react-router-dom";

import "../../../styles/header/logo.scss";

const Comp_logo__header = () => {
  return (
    <div className="comp_logo__header">
      <Link to="/">
        <h2 className="logo_txt">Style Document System</h2>
      </Link>
    </div>
  );
};

export default Comp_logo__header;
