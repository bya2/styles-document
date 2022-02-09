import axios from "axios";

import {
  URL__AUTH__SIGN_IN,
  URL__AUTH__VALIDATION,
  URL__EXP__NODE_LIST,
  URL__EXP__LOAD_GROUP_LIST,
  URL__EXP__LOAD_DOC_LIST,
  URL__ELEM__LOAD_LIST,
} from "../../config/api/get/endpoint";
import {
  ERR_MSG__AUTH__SIGN_IN,
  ERR_MSG__AUTH__VALIDATION,
  ERR_MSG__EXP__NODE_LIST,
  ERR_MSG__EXP__LOAD_GROUP_LIST,
  ERR_MSG__EXP__LOAD_DOC_LIST,
  ERR_MSG__ELEM__LOAD_LIST,
} from "../../config/api/get/message";

export const fn_logic__GET__auth__validation = () => {
  const sess_strg__ref_hashed_user =
    window.sessionStorage.getItem("ref_hashed_user");
  if (
    sess_strg__ref_hashed_user === undefined ||
    sess_strg__ref_hashed_user === null
  ) {
    return false;
  }

  return axios
    .get(URL__AUTH__VALIDATION, {
      params: {
        validateStatus: (status) => status < 500,
        ref_hashed_user: sess_strg__ref_hashed_user,
      },
    })
    .then((res) => {
      const { status, data } = res;

      if (status !== data.code) {
        console.log(status, data.code);
        throw Error("상태 코드와 응답 코드 불일치");
      }

      switch (status) {
        case 200:
          break;
        case 404:
          break;
        default:
          break;
      }

      return data;
    })
    .catch((err) => {
      console.error(`${ERR_MSG__AUTH__VALIDATION}${err}`);
      return {
        code: 500,
        message: "ERR",
        data: {
          valid: false,
          ref_hashed_user: null,
        },
      };
    });
};

export const fn_logic__GET__auth__sign_in = (state__obj_sign_in_info) => {
  return axios
    .get(URL__AUTH__SIGN_IN, {
      validateStatus: (status) => status < 500,
      params: state__obj_sign_in_info,
    })
    .then((res) => {
      const { status, data } = res;
      if (status !== data.code) {
        console.log(status, data.code);
        throw Error("상태 코드와 응답 코드 불일치");
      }

      switch (status) {
        case 200:
          const { ref_user_id, ref_hashed_user } = data.data;
          window.sessionStorage.setItem("ref_user_id", ref_user_id);
          window.sessionStorage.setItem("ref_hashed_user", ref_hashed_user);
          break;
        case 400:
          console.log(400, "유효하지 않은 비밀번호");
          break;
        case 404:
          console.log(404, "조회할 수 없는 아이디");
          break;
        default:
          break;
      }

      return data;
    })
    .catch((err) => {
      console.error(`${ERR_MSG__AUTH__SIGN_IN}${err}`);
    });
};

export const fn_logic__GET__exp__node_list = (_id = "bya2") => {
  const ref = sessionStorage.getItem("ref_hashed_user");

  return axios
    .get(URL__EXP__NODE_LIST, {
      params: {
        id: _id,
      },
    })
    .then((res) => {
      if (res.status !== 200) throw Error("Unknown status code.");

      const { status, data } = res;
      return {
        status,
        data,
      };
    })
    .catch((err) => {
      console.error(ERR_MSG__EXP__NODE_LIST);
      if (err.response) {
        const res = err.response;
        console.error(res.data);
        console.error(res.status);
        console.error(res.headers);
      }
    });
};

export const fn_logic__GET__exp__load_group_list = () => {
  const config = {
    method: "get",
    url: URL__EXP__LOAD_GROUP_LIST,
    params: {},
  };

  return axios(config)
    .then((res) => {
      if (res.status === 200) {
      }
    })
    .catch((err) => {
      console.error(`${ERR_MSG__EXP__LOAD_GROUP_LIST}${err}`);
      return err;
    });
};

export const fn_logic__GET__doc__load_list = () => {
  const user_id = sessionStorage.getItem("user");
  const ref_hashed_user = sessionStorage.getItem("ref_hashed_user");

  return axios
    .get(URL__EXP__LOAD_DOC_LIST, {
      // 유저 아이디, 해시 값
      params: {},
    })
    .then((res) => {
      const STATUS = res.status;

      if (STATUS === 200) {
        return {
          code: STATUS,
          data: res.data,
        };
      }
    })
    .catch((err) => {
      console.error(`${ERR_MSG__EXP__LOAD_DOC_LIST}${err.message}`);

      return {
        code: err.code,
        error: err,
      };
    });
};

export const fn_logic__GET__elem__load_list = () => {
  axios
    .get(URL__ELEM__LOAD_LIST, {
      params: {},
    })
    .then((res) => {
      if (res.status === 200) {
      }
    })
    .catch((err) => {
      console.error(`${ERR_MSG__ELEM__LOAD_LIST}${err.message}`);
    });
};
