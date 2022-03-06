import { Link } from "react-router-dom";

export default function CompLogo({ prop__logo_content__str }) {
  return (
    <div className="comp logo box">
      <Link to="/">
        <h2 className="content">{prop__logo_content__str}</h2>
      </Link>
    </div>
  );
}
