import axios from "axios";

import {
  URL__AUTH__SIGN_IN,
  URL__USR__DOC_LIST,
  URL__USR_DOC__ELEM_LIST,
} from "../../config/api/get/endpoint";
import {
  ERR_MSG__AUTH__SIGN_IN,
  ERR_MSG__USR__DOC_LIST,
  ERR_MSG__USR_DOC__ELEM_LIST,
} from "../../config/api/get/message";

export const fn_logic__GET__auth__sign_in = (state__obj_sign_in_info) => {
  axios
    .get(URL__AUTH__SIGN_IN)
    .then((res) => {
      const STATUS = res.status;

      switch (STATUS) {
        case 200:
          sessionStorage.setItem(
            "obj_user_info",
            JSON.stringify(state__obj_sign_in_info)
          );
          // navigator(
          //   `/${JSON.parse(sessionStorage.getItem("obj_user_info")).id}`
          // );
          console.log(JSON.parse(sessionStorage.getItem("obj_user_info")).id);
          console.log(
            JSON.parse(sessionStorage.getItem("obj_user_info")).password
          );
          break;
        default:
          break;
      }
    })
    .catch((err) => {
      console.error(`${ERR_MSG__AUTH__SIGN_IN}${err}`);
    });
};
export const fn_logic__GET__usr__doc_list = () => {
  axios
    .get(URL__USR__DOC_LIST)
    .then((res) => {})
    .catch((err) => {
      console.error(`${ERR_MSG__USR__DOC_LIST} (fn_logic__GET__usr__doc_list)`);
    });
};
export const fn_logic__GET__usr_doc__elem_list = () => {
  axios
    .get(URL__USR_DOC__ELEM_LIST)
    .then((res) => {})
    .catch((err) => {
      console.error(
        `${ERR_MSG__USR_DOC__ELEM_LIST} (fn_logic__GET__usr_doc__elem_list)`
      );
    });
};
