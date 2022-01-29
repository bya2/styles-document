import { useEffect, useState } from "react";

import { fn_GET__usr_doc_elems } from "../../../logic/rest";
import ElemPalette from "./elem__palette";
import ElemTypography from "./elem__typography";
import DocElemMarkdown from "./elem__markdown";

const obj_comp_elems = {
  palette: (key, value) => (
    <ElemPalette key={key} editor_txta__str_value={value} />
  ),
  typography: (key, value) => (
    <ElemTypography key={key} editor_txta__str_value={value} />
  ),
  markdown: (key, value) => (
    <DocElemMarkdown key={key} editor_txta__str_value={value} />
  ),
};

/**
 * TODO:
 * -- 서버에 문서 요소들 요청 (보낼 리소스: 유저 아이디 및 문서 이름)
 * -- 문서 요소들 렌더링
 */
const ElemList = () => {
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

export default ElemList;
