const router = require("express").Router();

const {
  fn_logic__create_SALT,
  fn_logic__create_DIGEST,
  fn_logic__logging_hashing_info,
  fn_logic__compare_hashing_info,
} = require("../../logic/hashing");

const fn_service__auth__sign_up = require("../../service/sign_up");
const fn_service__auth__sign_in = require("../../service/sign_in");

/**
 * GET
 */
router.get("/sign_in", (req, res) => {
  console.log("res... (sign_in)");

  const query__obj_sign_in_info = req.query;
  console.log(query__obj_sign_in_info);

  fn_service__auth__sign_in(query__obj_sign_in_info).then((obj_data) => {
    if (obj_data == null) {
      res.status(404).send(null);
      return;
    }

    if (!obj_data.is_check_valid) {
      res.status(400).json({
        is_check_valid: false,
      });
      return;
    }
    console.log(obj_data);
    res.status(200).json(obj_data);
  });
});

/**
 * POST
 */
router.post("/sign_up", (req, res) => {
  console.log("res... (sign_up)");
  const body__obj_sign_up_info = req.body;
  const { id, password, hashed_password, email } = body__obj_sign_up_info;
  console.log(body__obj_sign_up_info);

  fn_logic__create_SALT(hashed_password).then((SALT) => {
    const mixed_SATL = hashed_password + SALT;
    console.log(mixed_SATL.length);
    fn_logic__create_DIGEST(password, mixed_SATL)
      .then((DIGEST) => {
        const is_check__vaild = fn_logic__compare_hashing_info(
          password,
          DIGEST
        );
        if (!is_check__vaild) throw Error();

        const obj_sign_up_info = {
          id,
          hashed_password: DIGEST,
          email,
        };

        fn_service__auth__sign_up(obj_sign_up_info);

        fn_logic__logging_hashing_info(password, mixed_SATL, DIGEST);
      })
      .catch((err) => {
        console.error(`${err}`);
      });
  });

  // fn_dml__insert_user(req.body);
  res.status(201);
});

module.exports = router;
