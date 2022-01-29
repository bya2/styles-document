const bcrypt = require("bcrypt");
const { cfg__obj_encrypt_info } = require("../config/encrypt");
const { num__key_stretching } = cfg__obj_encrypt_info;

const logic__obj_hashing = {
  fn_logic__create_SALT(_pwd) {
    return bcrypt.genSalt(num__key_stretching).catch((err) => {
      console.error(`${err}`);
    });
  },
  fn_logic__create_DIGEST(_pwd, _SALT) {
    return bcrypt.hash(_pwd, _SALT).catch((err) => {
      console.error(`${err}`);
    });
  },
  fn_logic__compare_hashing_info(_pwd, _digest) {
    return bcrypt.compareSync(_pwd, _digest);
  },
  fn_logic__logging_hashing_info(_pwd, _SALT, _DIGEST) {
    console.log(`
KS_NUM\t: ${num__key_stretching},
PWD\t: ${_pwd},
SALT\t: ${_SALT},
S_LENGTH: ${_SALT.length},
DIGEST\t: ${_DIGEST},
D_LEGNTH: ${_DIGEST.length}
    `);
  },
  fn_logic__return_SALT() {
    return bcrypt
      .genSalt(num__key_stretching)
      .then((num) => {
        return num + "1111111111111111111111111";
      })
      .catch((err) => console.error(err));
  },
};

module.exports = logic__obj_hashing;
