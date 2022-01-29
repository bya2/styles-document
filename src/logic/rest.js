import axios from "axios";
import qs from "qs";

/**
 * Config:
 *  URL
 *  Error message
 */
import {
  // GET
  URL__SIGN_IN,
  URL__USR__DOC_LIST,
  URL__USR_DOC__ELEM_LIST,
  // POST
  URL__SIGN_UP,
  URL__ADD_DOC,
  URL__ADD_DOC_ELEM,
} from "../config/server";

import {
  // GET
  ERR_MSG__SIGN_IN,
  ERR_MSG__USR__DOC_LIST,
  ERR_MSG__USR_DOC__ELEM_LIST,
  // POST
  ERR_MSG__SIGN_UP,
  ERR_MSG__ADD_DOC,
  ERR_MSG__ADD_DOC_ELEM,
} from "../config/message";

/**
 * GET
 */
export const fn_GET__sign_in = (state__obj_data) => {
  axios
    .get(URL__SIGN_IN, {
      params: state__obj_data,
    })
    .then((res) => {
      console.log(res.data);

      switch (res.status) {
        case 200:
          sessionStorage.setItem(
            "obj_user_info",
            JSON.stringify(state__obj_data)
          );
          navigator("/doc");
          console.log(
            JSON.parse(sessionStorage.getItem("obj_user_info")).user_id
          );
          console.log(
            JSON.parse(sessionStorage.getItem("obj_user_info")).password
          );
          break;
        default:
        // code
      }
    })
    .catch((err) => {
      console.error(`${ERR_MSG__SIGN_IN}${err}`);
    });
};

// r__id.side_bar
export const fn_GET__usr_doc_list = (state__arr_docs, set_state__arr_docs) => {
  axios
    .get(URL__USR__DOC_LIST, {
      params: state__arr_docs,
    })
    .then((res) => {
      set_state__arr_docs(res.data);
    })
    .catch((err) => {
      console.error(`${ERR_MSG__USR__DOC_LIST}${err}`);
    })
    .then(() => {});
};

// r__id__doc.elements
export const fn_GET__usr_doc_elems = (set_state__arr_usr_doc_elems) => {
  console.log("fn_GET__usr_doc_elems");
  // const obj_user_info = JSON.parse(sessionStorage.getItem("obj_user_info"));
  // const user_id = obj_user_info.user_id || undefined;
  axios
    .get(URL__USR_DOC__ELEM_LIST, {
      // params: user_id,
    })
    .then((res) => {
      if (res.status === 200) {
        console.log(`STAUTS: ${res.status}`);
        set_state__arr_usr_doc_elems(res.data);
      } else {
        console.log(`STAUTS: ${res.status}`);
      }
    })
    .catch((err) => {
      console.error(`${ERR_MSG__USR_DOC__ELEM_LIST}${err}`);
    })
    .then(() => {});
};

/**
 * POST
 */
export const fn_POST__sign_up = (state__obj_data) => {
  axios
    .post(URL__SIGN_UP, qs.stringify(state__obj_data))
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) => {
      console.error(`${ERR_MSG__SIGN_UP}${err}`);
    });
};

export const fn_POST__add_doc = (
  state__obj_doc_info,
  set_state__obj_doc_info
  // set_state__is_active__adding_doc
) => {
  // const obj_axios_POST_options = {
  //   method: "POST",
  //   headers: { "content-type": "application/x-www-form-urlencoded" },
  //   data: qs.stringify(state__obj_doc_info),
  //   url: STR_URL,
  // };

  axios
    .post(URL__ADD_DOC, qs.stringify(state__obj_doc_info), {
      "content-type": "application/x-www-form-urlencoded",
    })
    .then((res) => {
      set_state__obj_doc_info(res.data);
    })
    .catch((err) => {
      console.error(`${ERR_MSG__ADD_DOC}${err}`);
    })
    .then(() => {
      //   set_state__is_active__adding_doc(false);
      //   // Remove string: adding_doc_input
      //   ref_adding_doc_input.current.value = "";
      //   set_state__obj_doc_info({
      //     ...state__obj_doc_info,
      //     [e.target.name]: e.target.value,
      //   });
      // });
    });
};

// r__id__doc.editor
export const fn_POST__add_doc_elem = (
  state__str_selected_elem,
  state__str_txta_value
) => {
  axios
    .post(
      URL__ADD_DOC_ELEM,
      qs.stringify({
        selector: state__str_selected_elem,
        value: state__str_txta_value,
      })
    )
    .then((res) => {
      if (res.status === 200) {
        console.log(200);
        console.log(res.data);
      } else if (res.status === 400) {
        console.log(400);
      } else if (res.status === 500) {
        console.log(500);
      }
    })
    .catch((err) => {
      console.error(`${ERR_MSG__ADD_DOC_ELEM}${err}`);
    })
    .then(() => {});
};
