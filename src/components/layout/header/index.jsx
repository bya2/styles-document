import "styles/layout/header.scss";

import CompLogo from "components/layout/header/logo";
import CompSession from "components/layout/header/session";

const logo_content__str = "Style Explorer";

export default function CompLayoutHeader() {
  return (
    <header>
      <div className="menu"></div>
      <CompLogo prop__logo_content__str={logo_content__str} />
      <CompSession />
    </header>
  );
}
