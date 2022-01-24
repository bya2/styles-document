import { useEffect, useState } from "react";

import { fn_GET__usr_doc_elems } from "../../../logic/rest";
import DocPalette from "./palette";
import DocMarkdown from "./markdown";

const obj_comp_elems = {
  palette: (key, value) => (
    <DocPalette key={key} editor_txta__str_value={value} />
  ),
  typography: <></>,
  markdown: (key, value) => (
    <DocMarkdown key={key} editor_txta__str_value={value} />
  ),
};

const DocElements = () => {
  const [state__arr_usr_doc_elems, set_state__arr_usr_doc_elems] =
    useState(undefined);

  useEffect(() => {
    fn_GET__usr_doc_elems(set_state__arr_usr_doc_elems);
  }, []);

  useEffect(() => {
    console.log("docelem1");
    console.log(state__arr_usr_doc_elems);
  }, [state__arr_usr_doc_elems]);

  return state__arr_usr_doc_elems === undefined ? (
    <></>
  ) : (
    <>
      {state__arr_usr_doc_elems.map((obj_usr_doc_elem, i) =>
        obj_comp_elems[obj_usr_doc_elem.selector](
          `${obj_usr_doc_elem.selector}${i}`,
          obj_usr_doc_elem.value
        )
      )}
    </>
  );
};

export default DocElements;
