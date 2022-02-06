const Node = require("../../models/nodes");

const fn_service__GET__exp__node_list = (param__writer) => {
  return Node.find({ writer: param__writer })
    .exec()
    .then((result) => {
      if (result === null) return null;
      return result;
    })
    .catch((err) => {
      console.log("ERR: service:exp__node_list");
    });
};

module.exports = fn_service__GET__exp__node_list;
