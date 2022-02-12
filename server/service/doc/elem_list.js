const Element = require("../../models/elements");

const fn_service__GET__doc__elem_list = (_obj_req_q) => {
  if (!_obj_req_q) return null;

  const { param__id, param__doc } = _obj_req_q;

  return Element.find({ writer: param__id, document: param__doc })
    .exec()
    .then((results__arr_elems) => {
      if (results__arr_elems instanceof Array) {
        throw Error("non-array");
      }

      if (results__arr_elems === null || results__arr_elems.length === 0) {
        return {
          code: 404,
          message: "no item",
          data: null,
        };
      }

      return {
        code: 200,
        message: "success",
        data: {
          elements: results__arr_elems,
        },
      };
    })
    .catch((err) => {
      console.log("ERR:\nLOC: service - doc/elem_list");
      console.error(err);
    });
};

module.exports = fn_service__GET__doc__elem_list;
