const router = require("express").Router();
const fn_service__GET__doc__elem_list = require("../../service/doc/elem_list");
const fn_service__POST__doc__add_elem = require("../../service/doc/add_elem");
/**
 * Get
 */
router.get("/elem_list", (req, res) => {
  console.log("res... (doc/elem_list)");
  try {
    const obj_req_q = req.query;
    fn_service__GET__doc__elem_list(obj_req_q)
      .then((obj_res_data) => {
        const { code } = obj_res_data;
        res.status(code).json(obj_res_data);
      })
      .catch((err) => {
        console.log(`ERR:\nLOC: api-get-doc/elem_list-s_processor`);
        console.error(err);
      });
  } catch (err) {
    console.log(`ERR:\nLOC: api-get-doc/elem_list`);
    console.error(err);
  }
});

/**
 * Post
 */
router.post("/add_elem", (req, res) => {
  console.log("res... (doc/add_doc)");
  try {
    const obj_req_body = req.body;
    fn_service__POST__doc__add_elem(obj_req_body)
      .then((obj_res_data) => {
        const { code } = obj_res_data;
        res.status(code).json(obj_res_data);
      })
      .catch((err) => {
        console.log("ERR:\nLOC: api-post-doc/add_elem-s_processor");
        console.error(err);
      });
  } catch (err) {
    console.log("ERR:\nLOC: api-post-doc/add_elem");
    console.error(err);
  }
});

module.exports = router;
