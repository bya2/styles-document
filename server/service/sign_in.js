const { fn_logic__compare_hashing_info } = require("../logic/hashing");

const User = require("../models/users");

const fn_service__auth__user_validation = (password, hashed_password) => {
  const is_check_valid = fn_logic__compare_hashing_info(
    password,
    hashed_password
  );
  return is_check_valid;
};

const fn_service__auth__sign_in = (obj_sign_in_info) => {
  const { id, password } = obj_sign_in_info;

  return User.findOne({ id })
    .exec()
    .then((result) => {
      if (result === null) return null;

      const is_check_valid = fn_service__auth__user_validation(
        password,
        result.hashed_password
      );
      return {
        is_check_valid,
        ref_hashed_user: result.hashed_password,
      };
    })
    .catch((err) => {
      console.error(err);
    });
};

module.exports = fn_service__auth__sign_in;
