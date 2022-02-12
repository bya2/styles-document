const Element = require("../../models/elements");

const fn_service__POST__doc__add_elem = (_obj_req_body) => {
  const { type, ta__str_value, param__id, param__doc, styles } = _obj_req_body;

  console.log(_obj_req_body);

  const elem = new Element({
    type,
    value: ta__str_value,
    writer: param__id,
    document: param__doc,
    styles,
  });

  return elem
    .save()
    .then((result__obj_elem) => {
      console.log("Success insert DB. (Element)");
      return {
        code: 201,
        message: "success",
        data: {
          element: result__obj_elem,
        },
      };
    })
    .catch((err) => {
      console.log("ERR:\nLOC: service - doc - add_elem");
      console.error(err);

      return {
        code: 500,
        message: "unknown error",
        data: null,
      };
    });
};

module.exports = fn_service__POST__doc__add_elem;
