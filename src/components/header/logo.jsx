import "../../styles/header/logo.scss";
import logo_32px from "../../image/bya-logo-32.png";

const logo_img = {
  src: logo_32px,
  alt: "logo image",
};

const HeaderLogo = () => {
  return (
    <div className="wrapper__header_logo">
      <img src={logo_img.src} alt={logo_img.alt} />
      <h1>Style Documents</h1>
    </div>
  );
};

export default HeaderLogo;
