import "../../../../../../styles/main/aside/left/explorer/index.scss";

const arr = [];

const Comp_explorer_doc_list = ({ children }) => {
  return (
    <>
      {arr.map((obj_doc) => (
        <li></li>
      ))}
      <li>C</li>
      <li>A</li>
      <li>A</li>
      <li>A</li>
      <li>A</li>
      <li>B</li>
    </>
  );
};

export default Comp_explorer_doc_list;
