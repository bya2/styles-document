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
    .then((result__obj_doc) => {
      if (!result__obj_doc || typeof result__obj_doc !== "object") {
        return {
          code: 404,
          message: "no existed id",
          data: null,
        };
      }

      const chk__is_valid__pwd = fn_service__auth__user_validation(
        password,
        result__obj_doc.hashed_password
      );

      return chk__is_valid__pwd
        ? {
            code: 200,
            message: "success sign in",
            data: {
              ref_user_id: result__obj_doc.id,
              ref_hashed_user: result__obj_doc.hashed_password,
            },
          }
        : {
            code: 400,
            message: "invalid password",
            data: null,
          };
    })
    .catch((err) => {
      console.error(err);
    });
};

module.exports = fn_service__auth__sign_in;
