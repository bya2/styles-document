import axios from "axios";
import qs from "qs";

import { URL__AUTH__SIGN_UP, URL__EXP__ADD_GROUP, URL__EXP__ADD_DOC, URL__DOC__ADD_ELEM } from "../../config/api/post/endpoint";
import {
  ERR_MSG__AUTH__SIGN_UP,
  ERR_MSG__EXP__ADD_GROUP,
  ERR_MSG__EXP__ADD_DOC,
  ERR_MSG__DOC__ADD_ELEM,
} from "../../config/api/post/message";

export const fn_logic__POST__auth__sign_up = (state__obj_sign_up_info) => {
  return axios
    .post(URL__AUTH__SIGN_UP, qs.stringify(state__obj_sign_up_info))
    .then((res) => {
      if (res.status === 200 || res.status === 201) {
        console.log("RES:", res.data);
        return true;
      } else {
        console.log("Unknown code");
        return false;
      }
    })
    .catch((err) => {
      console.error(`${ERR_MSG__AUTH__SIGN_UP}${err}`);
    });
};

export const fn_logic__POST__exp__add_group = (_obj_data) => {
  console.log("fn_logic__POST__exp__add_group");

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
      console.error(`${ERR_MSG__EXP__ADD_GROUP}${err}`);
      return null;
    });
};

export const fn_logic__POST__exp__add_doc = (_obj_data) => {
  console.log("fn_logic__POST__exp__add_doc");

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

export const fn_logic__POST__doc__add_elem = (_obj_data) => {
  return axios
    .post(
      URL__DOC__ADD_ELEM,
      qs.stringify({
        ..._obj_data,
      })
    )
    .then((res) => {
      if (res.status !== 201) throw Error("Unknown status code.");

      const { status, data } = res;
      if (status !== data.code) throw Error("상태 코드와 응답 코드가 불일치");

      return data;
    })
    .catch((err) => {
      console.log(`${ERR_MSG__DOC__ADD_ELEM}`);
      console.error(err);

      return null;

      // return {
      //   code: err.code,
      //   data: {},
      // };
    });
};
