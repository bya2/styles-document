import "../../../../../../styles/main/aside/left/explorer/index.scss";
import cls_list__fas_icon from "../../../../../../icon/font_awesome";

import { useState, useEffect } from "react";

const { cls__icon_doc, cls__icon_group } = cls_list__fas_icon;

const dummy_data__arr_doc_list = [
  {
    id: "213dsafa123",
    type: "document",
    name: "이진형의 문서1",
    parent: null,
    children: null, // arr
  },
  {
    id: "sdaffads132",
    type: "group",
    name: "이진형의 폴더1",
    parent: null,
    children: [],
  },
  {
    id: "sdafadsf13114",
    type: "document",
    name: "이진형의 문서2",
    parent: null,
    children: null,
  },
];

const dom_doc_elem = (obj_doc_elem) => (
  <div key={obj_doc_elem.id}>
    <div className="">
      <i
        className={`icon ${
          obj_doc_elem.type === "group" ? cls__icon_group : cls__icon_doc
        }`}
      />
      <p className="name">{obj_doc_elem}</p>
    </div>
    <div>{obj_doc_elem}</div>
  </div>
);

const Comp_explorer_group_list = ({ children }) => {
  const [state__arr_doc_list, set_state__arr_doc_list] = useState([]);

  useEffect(() => {}, []);

  return (
    <>
      {dummy_data__arr_doc_list.map((obj_doc_elem) => {
        return (
          <div key={obj_doc_elem.id}>
            <div>
              <i
                className={
                  obj_doc_elem.type === "document"
                    ? cls__icon_doc
                    : cls__icon_group
                }
              ></i>
              <p>{obj_doc_elem.name}</p>
            </div>
            {/* {obj_group.children} */}
          </div>
        );
      })}
      {state__arr_doc_list.map((obj_doc_elem) => dom_doc_elem(obj_doc_elem))}
    </>
  );
};

export default Comp_explorer_group_list;
