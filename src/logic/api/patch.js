import axios from "axios";
import qs from "qs";

import { URL__DOC__MOD_ELEM } from "../../config/api/patch/endpoint";
import { ERR_MSG__DOC__MOD_ELEM } from "../../config/api/patch/message";

// No payload.

/**
 * Document
 */
export const fn_logic__PATCH__doc__mod_elem = (_obj_req_body) => {
  return axios
    .patch(URL__DOC__MOD_ELEM, _obj_req_body)
    .then((res) => {
      console.log(200200200);
      const { status, data } = res;
      if (status !== data.code) throw Error("상태 코드와 응답 코드 불일치.");

      switch (status) {
        case 200:
          console.log(200200200);
          break;
        case 404:
          break;
        default:
          throw Error("알 수 없는 상태 코드와 응답 코드");
      }

      return data;
    })
    .catch((err) => {
      console.log(ERR_MSG__DOC__MOD_ELEM);
      console.error(err);
      return {
        code: err.code,
        message: ERR_MSG__DOC__MOD_ELEM,
        data: null,
      };
    });
};
