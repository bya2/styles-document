import "../../../styles/main/r__id__doc/elem.scss";

const ElemWrapper = ({ children }) => {
  return (
    <article className="comp_elem">
      <div className="comp_elem_inner">{children}</div>
    </article>
  );
};

export default ElemWrapper;
