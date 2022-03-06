import { Link } from "react-router-dom";

export default function CompSearchItems({ prop__search_items__arr }) {
  return (
    <div className="comp search-items outer">
      <ul class="list">
        <>
          {prop__search_items__arr.map((item__obj) => {
            const { key, value } = item__obj;
            return (
              <li key={key} className="item">
                <div className="item-inner">
                  <Link to="#">
                    <span className="icon-box">
                      <i className={`icon`}>G</i>
                    </span>
                    <div className="content-box">
                      <span>{value}</span>
                    </div>
                  </Link>
                </div>
              </li>
            );
          })}
        </>
      </ul>
    </div>
  );
}
