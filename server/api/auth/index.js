const router = require("express").Router();

const {
  fn_logic__create_SALT,
  fn_logic__create_DIGEST,
  fn_logic__logging_hashing_info,
  fn_logic__compare_hashing_info,
} = require("../../logic/hashing");

const fn_service__auth__sign_up = require("../../service/auth/sign_up");
const fn_service__auth__sign_in = require("../../service/auth/sign_in");
const fn_service__auth__validation = require("../../service/auth/validation");

/**
 * GET
 */
router.get("/sign_in", (req, res) => {
  console.log("res... (sign_in)");

  const query__obj_sign_in_info = req.query;
  console.log("QUERY:", query__obj_sign_in_info);

  if (!query__obj_sign_in_info || typeof query__obj_sign_in_info !== "object") {
    res.status(400).json({
      code: 400,
      message: "no content",
      data: null,
    });
    return;
  }

  console.log(1);

  res.status(200).json({"dsadas": 1});

  // fn_service__auth__sign_in(query__obj_sign_in_info)
  //   .then((data__obj) => {
  //     const { code } = data__obj;
  //     console.log(`(service) sign in: ${code}`);
  //     res.status(code).json(data__obj);
  //   })
  //   .catch((err) => {
  //     console.error(err);
  //     res.status(500);
  //   });
});

router.get("/validation", (req, res) => {
  console.log("res... (validation)");

  const req_q__ref_hashed_user = req.query;
  console.log("Q:", req_q__ref_hashed_user);

  fn_service__auth__validation(req_q__ref_hashed_user)
    .then((obj_res_data) => {
      const { code } = obj_res_data;
      console.log(`(service) validation: ${code}`);
      res.status(code).json(obj_res_data);
    })
    .catch((err) => {
      console.error(err);
      res.status(500);
    });
});

/**
 * POST
 */
router.post("/sign_up", (req, res) => {
  console.log("res... (sign_up)");
  const body__obj_sign_up_info = req.body;
  // const { id, password, hashed_password, email } = JSON.parse(body__obj_sign_up_info);
  console.log(body__obj_sign_up_info);

  // fn_logic__create_SALT(hashed_password).then((SALT) => {
  //   const mixed_SATL = hashed_password + SALT;
  //   console.log(mixed_SATL.length);
  //   fn_logic__create_DIGEST(password, mixed_SATL)
  //     .then((DIGEST) => {
  //       const is_check__vaild = fn_logic__compare_hashing_info(
  //         password,
  //         DIGEST
  //       );
  //       if (!is_check__vaild) throw Error();

  //       const obj_sign_up_info = {
  //         id,
  //         hashed_password: DIGEST,
  //         email,
  //       };

  //       fn_service__auth__sign_up(obj_sign_up_info);

  //       fn_logic__logging_hashing_info(password, mixed_SATL, DIGEST);
  //     })
  //     .catch((err) => {
  //       console.error(`${err}`);
  //     });
  // });

  // fn_dml__insert_user(req.body);
  res.status(201).json({"dfsjakl": "dfd"});
});

module.exports = router;
