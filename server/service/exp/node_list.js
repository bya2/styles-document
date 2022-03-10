const Node = require("../../models/nodes");

const fn_service__GET__exp__node_list = (param__writer) => {
  return Node.find({ writer: param__writer })
    .exec()
    .then((results__arr) => {
      if (results__arr === null) return [];
      return results__arr;
    })
    .catch((err) => {
      console.log("ERR: service:exp__node_list");
    });
};

module.exports = fn_service__GET__exp__node_list;
