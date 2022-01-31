import "../../../styles/header/menu/search_list.scss";

const arr = [
  { value: "A" },
  { value: "B" },
  { value: "C" },
  { value: "D" },
  { value: "E" },
  { value: "F" },
  { value: "G" },
];

const Comp_menu__search_list = ({ state__is_focus_input }) => {
  return (
    <div className="comp_menu__search_list">
      <ul
        className={`${
          state__is_focus_input ? "parent_state__focus" : undefined
        }`}
      >
        <>
          {arr.map((obj) => (
            <li key={obj.value}>{obj.value}</li>
          ))}
        </>
      </ul>
    </div>
  );
};

export default Comp_menu__search_list;
