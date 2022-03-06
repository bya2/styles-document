import { useEffect, useState } from "react";

const menu_elems__arr = [
  {
    alt: "bar",
    icon: "",
    comp: <></>,
  },
  {
    alt: "search-bar",
    icon: "",
    comp: <></>,
  },
];

const init_state__cond__obj = menu_elems__arr.reduce((obj, menu_elem__obj) => {
  obj[menu_elem__obj.alt] = false;
  return obj;
}, {});

export default function CompHeaderMenu() {
  // State
  const [state__cond__obj, set_state__cond__obj] = useState(init_state__cond__obj);

  // Setter

  // Mount, Update

  // Event

  return (
    <div className="comp header-menu box">
      <ul className="list">
        <>
          {menu_elems__arr.map((menu_elem__obj) => {
            const { alt, icon, comp } = menu_elem__obj;
            return <li key={alt} name={alt} className={``}></li>;
          })}
        </>
      </ul>
    </div>
  );
}
