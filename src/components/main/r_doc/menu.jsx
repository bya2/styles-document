import "../../../styles/main/r_doc/menu.scss";

const STR__CLS_ROUTE = "r_doc";
const STR__CLS_WRAPPER = "wrapper_doc_menu";
const STR__CLS_ION_ICON = "ion_icon";

const DocMenu = () => {
  return (
    <div className={`${STR__CLS_WRAPPER} ${STR__CLS_ROUTE}`}>
      <i className="fas fa-palette"></i>
      <i className="fas fa-pen-alt"></i>
      <i className="fab fa-medium-m"></i>
    </div>
  );
};
export default DocMenu;
