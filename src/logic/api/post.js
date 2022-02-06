import axios from "axios";
import qs from "qs";

import {
  URL__AUTH__SIGN_UP,
  URL__EXP__ADD_GROUP,
  URL__EXP__ADD_DOC,
  URL__ADD_DOC_ELEM,
} from "../../config/api/post/endpoint";
import {
  ERR_MSG__AUTH__SIGN_UP,
  ERR_MSG__EXP__ADD_GROUP,
  ERR_MSG__EXP__ADD_DOC,
  ERR_MSG__ADD_DOC_ELEM,
} from "../../config/api/post/message";

export const fn_logic__POST__auth__sign_up = (
  state__obj_sign_up_info,
  fn_setter__success_sign_up
) => {
  console.log(state__obj_sign_up_info);

  axios
    .post(URL__AUTH__SIGN_UP, qs.stringify(state__obj_sign_up_info))
    .then((res) => {
      if (res.status === 200 || res.status === 201) {
        console.log("RES:", res.data);
        fn_setter__success_sign_up();
      }
    })
    .catch((err) => {
      console.error(`${ERR_MSG__AUTH__SIGN_UP}${err}`);
    });
};

export const fn_logic__POST__exp__add_group = (_obj_data) => {
  const config = {
    method: "post",
    url: URL__EXP__ADD_GROUP,
    data: qs.stringify({
      ..._obj_data,
      user: "bya2",
    }),
  };

  return axios(config)
    .then((res) => {
      if (res.status === 201) {
        return res.data;
      }
      return null;
    })
    .catch((err) => {
      console.error(`${ERR_MSG__EXP__ADD_DOC}${err}`);
      return null;
    });
};

export const fn_logic__POST__exp__add_doc = (_obj_data) => {
  const config = {
    method: "post",
    url: URL__EXP__ADD_DOC,
    data: qs.stringify({
      ..._obj_data,
      user: "bya2",
    }),
  };

  return axios(config)
    .then((res) => {
      if (res.status === 201) {
        return res.data;
      }
      return null;
    })
    .catch((err) => {
      console.error(`${ERR_MSG__EXP__ADD_DOC}${err}`);
      return null;
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
