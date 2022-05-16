const User = require("../../models/users");

const fn_service__auth__sign_up = (obj_sign_up_data) => {
  const usr = new User(obj_sign_up_data);
  usr
    .save()
    .then(() => {
      console.log("Success DB save.");
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = fn_service__auth__sign_up;
