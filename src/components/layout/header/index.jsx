import "styles/layout/header.scss";

import Logo from "components/layout/header/logo";

const logo_content__str = "Style Explorer";

export default function CompLayoutHeader() {
  return (
    <header>
      <div className="menu"></div>
      <Logo prop__logo_content__str={logo_content__str} />
      <div className="session"></div>
    </header>
  );
}
