const Node = require("../../models/nodes");

const fn_service__POST__exp__node_list = (_obj_node_data) => {
  const node = new Node(_obj_node_data);
  return node
    .save()
    .then((result) => {
      console.log("Success insert DB. (Node)");

      const { parent } = _obj_node_data;

      console.log(result._id.toString());
      Node.findByIdAndUpdate(
        { _id: parent },
        {
          $push: { children: result._id },
        }
      )
        .exec()
        .then((result) => {
          console.log("데이터 업데이트 성공");
          console.log(result);
        })
        .catch((err) => {
          console.log("데이터 업데이트 에러", err);
        });

      return result;
    })
    .catch((err) => {
      console.error("데이터 저장 에러");
    });
};

module.exports = fn_service__POST__exp__node_list;
