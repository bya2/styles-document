const router = require("express").Router();
// const { fn_dml__insert_user } = require("../service/db");
const {
  fn_logic__create_SALT,
  fn_logic__create_DIGEST,
} = require("../logic/hashing");

// router.use((req, res) => {
//   res.header("Access-Control-Allow-Origin", "http://localhost:3000");
//   res.header("Access-Control-Allow-Methods", "POST");
// });

router.post("/sign_up", (req, res) => {
  // res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  // res.header("Access-Control-Allow-Methods", "POST");
  console.log("res... (sign_up)");
  const body__obj_sign_up_info = req.body;
  const { id, password, hashed_password, email } = body__obj_sign_up_info;
  console.log(body__obj_sign_up_info);

  // fn_logic__create_SALT(hashed_password).then((SALT) => {
  //   const mixed_SATL = hashed_password + SALT;
  //   fn_logic__create_DIGEST(password, mixed_SATL).then((DIGEST) => {
  //     const obj_user_info = {
  //       id,
  //       hashed: DIGEST,
  //       email,
  //     };
  //     // fn_dml__insert_user(obj_user_info);
  //   });
  // });

  // fn_dml__insert_user(req.body);
  res.status(201);
});

router.post("/add_doc", (req, res) => {
  res.status(201);
});

router.post("/add_doc_elem", (req, res) => {
  res.status(201);
});

module.exports = router;

// 201: 새로운 리소스가 생성
