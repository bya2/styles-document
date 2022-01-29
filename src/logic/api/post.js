import axios from "axios";
import qs from "qs";

import {
  URL__SIGN_UP,
  URL__ADD_DOC,
  URL__ADD_DOC_ELEM,
} from "../../config/api/post/endpoint";
import {
  ERR_MSG__SIGN_UP,
  ERR_MSG__ADD_DOC,
  ERR_MSG__ADD_DOC_ELEM,
} from "../../config/api/post/message";

export const fn_logic__POST__auth__sign_up = (
  state__obj_sign_up_info,
  fn_setter__success_sign_up
) => {
  console.log(state__obj_sign_up_info);

  axios
    .post(URL__SIGN_UP, qs.stringify(state__obj_sign_up_info))
    .then((res) => {
      if (res.status === 200 || res.status === 201) {
        console.log("RES:", res.data);
        fn_setter__success_sign_up();
      }
    })
    .catch((err) => {
      console.error(`${ERR_MSG__SIGN_UP}${err}`);
    });
};
export const fn_logic__POST__add_doc = () => {
  axios
    .post(URL__ADD_DOC)
    .then((res) => {})
    .catch((err) => {
      console.error(`${ERR_MSG__ADD_DOC} fn_logic__POST__add_doc`);
    });
};
export const fn_logic__POST__add_doc_elem = () => {
  axios
    .post(URL__ADD_DOC_ELEM)
    .then((res) => {})
    .catch((err) => {
      console.error(`${ERR_MSG__ADD_DOC_ELEM} fn_logic__POST__add_doc_elem`);
    });
};
