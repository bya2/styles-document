const logic__obj_hashing = require("../logic/hashing");

// const PWD = "himanoooodsafdsfd";

// logic__obj_hashing.fn_logic__create_SALT(PWD).then((SALT) => {
//   logic__obj_hashing.fn_logic__create_DIGEST(PWD, SALT).then((DIGEST) => {
//     logic__obj_hashing.fn_logic__logging_hashing_info(PWD, SALT, DIGEST);
//   });
// });

// logic__obj_hashing.fn_logic__compare_hashing_info(
//   "himanasadsa",
//   "$2b$10$sRyJNemAQSdSYWFDxZQEK.HLqjkG2yaN595wFGR3yNPTbMETysmh."
// );

// logic__obj_hashing.fn_logic__create_SALT(PWD).then((SALT) => {
//   logic__obj_hashing.fn_logic__create_DIGEST(PWD, SALT).then((DIGEST) => {
//     const CURR_SALT = SALT + DIGEST;
//     logic__obj_hashing
//       .fn_logic__create_DIGEST(PWD, CURR_SALT)
//       .then((DIGEST2) => {
//         logic__obj_hashing.fn_logic__logging_hashing_info(
//           PWD,
//           CURR_SALT,
//           DIGEST2
//         );

//         logic__obj_hashing.fn_logic__compare_hashing_info(DIGEST2, DIGEST2);
//       });
//   });
// });

console.log(
  logic__obj_hashing.fn_logic__return_SALT().then((num) => console.log(num))
);
