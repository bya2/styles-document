import bcryptjs from "bcryptjs";

import { NUM__KEY_STRETCHING } from "../../config/hash/info";
import {
  ERR_MSG__CREATE_SALT,
  ERR_MSG__CREATE_DIGEST,
  ERR_MSG__COMPARE_PWD,
} from "../../config/hash/message";

export const fn_logic__hash__create_SALT = () => {
  try {
    // STR
    return bcryptjs.genSaltSync(NUM__KEY_STRETCHING);
  } catch (err) {
    console.error(`${ERR_MSG__CREATE_SALT}${err.message}`);
  }
};

export const fn_logic__hash__create_DIGEST = (
  _plain,
  _SALT = NUM__KEY_STRETCHING
) => {
  // _SALT: STR(SALT) or NUM(SALT_ROUND)
  try {
    // STR
    return bcryptjs.hashSync(_plain, _SALT);
  } catch (err) {
    console.error(`${ERR_MSG__CREATE_DIGEST}${err.message}`);
  }
};

export const fn_logic__hash__compare_PWD = (_plain, _DIGEST) => {
  try {
    // BOOL
    return bcryptjs.compareSync(_plain, _DIGEST);
  } catch (err) {
    console.error(`${ERR_MSG__COMPARE_PWD}${err.message}`);
  }
};
