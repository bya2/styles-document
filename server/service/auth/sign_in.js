const { fn_logic__compare_hashing_info } = require("../../logic/hashing");

const User = require("../../models/users");

const fn_service__auth__user_validation = (password, hashed_password) => {
  const is_check_valid = fn_logic__compare_hashing_info(
    password,
    hashed_password
  );
  return is_check_valid;
};

const fn_service__auth__sign_in = (_user_info__obj) => {
  const { id, password } = _user_info__obj;

  return User.findOne({ id })
    .exec()
    .then((result__obj) => {
      if (!result__obj || typeof result__obj !== "object") {
        return {
          code: 404,
          message: "no existed id",
          data: null,
        };
      }

      const chk__is_valid__pwd = fn_service__auth__user_validation(
        password,
        result__obj.hashed_password
      );

      return chk__is_valid__pwd
        ? {
            code: 200,
            message: "success sign in",
            result: {
              ref_user_id: result__obj.id,
              ref_hashed_user: result__obj.hashed_password,
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
