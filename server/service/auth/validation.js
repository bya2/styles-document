const User = require("../../models/users");

const fn_service__auth__validation = (_ref_hashed_user) => {
  if (!_ref_hashed_user) return null;

  return User.findOne({ hashed_password: _ref_hashed_user })
    .exec()
    .then((result__obj_doc) => {
      if (result__obj_doc === undefined || result__obj_doc === null)
        return {
          code: 404,
          message: "No item.",
          data: {
            valid: false,
            ref_hashed_user: null,
          },
        };

      return {
        code: 200,
        message: "Valid.",
        data: {
          valid: true,
          ref_hashed_user: result__obj_doc,
        },
      };
    })
    .catch((err) => {
      console.log("ERR:\n(service) fn_service__auth__validation");
      console.error(err);
      return null;
    });
};

module.exports = fn_service__auth__validation;
