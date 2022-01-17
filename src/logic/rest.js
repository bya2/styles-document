import axios from "axios";
import qs from "qs";

import { URL__SIGN_UP, URL__SIGN_IN } from "../config/server";

import {
  ERROR_MESSAGE__SIGN_UP,
  ERROR_MESSAGE__SIGN_IN,
} from "../config/message";

export const fn_POST__sign_up = (state__obj_data) => {
  axios
    .post(URL__SIGN_UP, qs.stringify(state__obj_data))
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) => {
      console.error(`${ERROR_MESSAGE__SIGN_UP}${err}`);
    });
};

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
      console.error(`${ERROR_MESSAGE__SIGN_IN}${err}`);
    });
};
