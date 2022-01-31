// const router = require("express").Router();

// const {
//   dummy__arr_usr_doc__elem_list,
//   dummy__arr_usr__doc_list,
// } = require("../dummy");

// // const { fn_dml__select_user__at_login } = require("../service/db");
// // const { fn_logic__compare_hashing_info } = require("../logic/hashing");

// router.use((req, res) => {
//   res.header("Access-Control-Allow-Origin", "http://localhost:3000");
//   res.header("Access-Control-Allow-Methods", "GET");
// });

// router.get("/sign_in", (req, res) => {
//   const query__obj_sign_in_info = req.query;
//   const { id, password } = query__obj_sign_in_info;

//   // fn_dml__select_user__at_login(query__obj_sign_in_info);
// });
// router.get("/usr__doc_list", (req, res) => {
//   res.status(200).json(dummy__arr_usr__doc_list);
// });
// router.get("/usr_doc__elem_list", (req, res) => {
//   res.status(200).json(dummy__arr_usr_doc__elem_list);
// });

// module.exports = router;

/**
 * 300:
 * -- 301: 요청한 리소스의 URI가 영구적으로 변경된 상태. (서버에서)
 * -- 302: 요청한 리소스의 URI가 일시적으로 변경된 상태. (서버에서)
 * -- 304: 캐시 목적. 해당 리소스가 수정되지 않음.
 */
