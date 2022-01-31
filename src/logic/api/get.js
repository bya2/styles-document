import axios from "axios";

import {
  URL__AUTH__SIGN_IN,
  URL__AUTH__VALIDATION,
  URL__EXP__LOAD_GROUP_LIST,
  URL__EXP__LOAD_DOC_LIST,
  URL__ELEM__LOAD_LIST,
} from "../../config/api/get/endpoint";
import {
  ERR_MSG__AUTH__SIGN_IN,
  ERR_MSG__AUTH__VALIDATION,
  ERR_MSG__EXP__LOAD_GROUP_LIST,
  ERR_MSG__EXP__LOAD_DOC_LIST,
  ERR_MSG__ELEM__LOAD_LIST,
} from "../../config/api/get/message";

export const fn_logic__GET__auth__validation = () => {
  const ref_hashed_user = sessionStorage.getItem("ref_hashed_user") || null;
  if (ref_hashed_user === null) {
    return null;
  }

  axios
    .get(URL__AUTH__VALIDATION, {
      params: {
        ref_hashed_user,
      },
    })
    .then((res) => {
      const STATUS = res.status;

      if (STATUS === 200) {
        return {
          code: 200,
          valid: true,
          ref_hashed_user,
        };
      }
    })
    .catch((err) => {
      console.error(`${ERR_MSG__AUTH__VALIDATION}${err}`);
      return {
        code: err.code,
        valid: false,
        error: err,
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
      const STATUS = res.status;

      switch (STATUS) {
        case 200:
          const { data } = res;
          const { ref_hashed_user } = data;
          sessionStorage.setItem("ref_hashed_user", ref_hashed_user);
          return 200;
        case 400:
          // 비밀번호가 틀림.
          console.log(400);
          return 400;
        case 404:
          // 아이디가 없음.
          console.log(404);
          return 404;
        default:
          break;
      }
    })
    .catch((err) => {
      console.error(`${ERR_MSG__AUTH__SIGN_IN}${err}`);
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
