const Element = require("../../models/elements");

const fn_service__PATCH__doc__mod_elem = (_obj_req_body) => {
  const { id, writer, document, value, type, styles } = _obj_req_body;

  return Element.findOneAndUpdate(
    { _id: id, writer, document },
    { value, type, styles },
    { new: true }
  )
    .exec()
    .then((result__obj_elem) => {
      console.log("RESULT", result__obj_elem);
      return {
        code: 200,
        message: "success update",
        data: {
          element: result__obj_elem,
        },
      };
    })
    .catch((err) => {
      console.log("ERR:\nLOC: service - doc/mod_elem");
      console.error(err);
      return {
        code: 500,
        message: "fail update",
      };
    });
};

module.exports = fn_service__PATCH__doc__mod_elem;
