const router = require("express").Router();
const fn_service__GET__exp__node_list = require("../../service/exp/node_list");
const fn_service__POST__exp__add_node = require("../../service/exp/add_node");

const dummy_data__node_list = [
  {
    _id: "doc_213dsafa123",
    type: "document",
    name: "이진형의 문서1",
    parent: null,
    children: null, // arr
  },
  {
    _id: "group_sdaffads132",
    type: "group",
    name: "이진형의 폴더1",
    parent: null,
    children: ["group_213dsafa123dsfadsf", "group_000fadsf13114sdafds"],
  },
  {
    _id: "doc_sdafadsf13114",
    type: "document",
    name: "이진형의 문서2",
    parent: null,
    children: null,
  },
  {
    _id: "group_213dsafa123dsfadsf",
    type: "group",
    name: "이진형의 폴더2",
    parent: "group_sdaffads132",
    children: ["doc_sdafadsf13114dfsasd", "doc_dafaddsfasf13114dfsasd"],
  },
  {
    _id: "group_000fadsf13114sdafds",
    type: "group",
    name: "이진형의 폴더3",
    parent: "group_sdaffads132",
    children: ["doc_sda3114dfsasd", "group_1234fsdafsasd"],
  },
  {
    _id: "doc_sdafadsf13114dfsasd",
    type: "document",
    name: "이진형의 문서2",
    parent: "group_213dsafa123dsfadsf",
    children: null,
  },
  {
    _id: "doc_dafaddsfasf13114dfsasd",
    type: "document",
    name: "이진형의 문서2",
    parent: "group_213dsafa123dsfadsf",
    children: null,
  },
  {
    _id: "doc_sda3114dfsasd",
    type: "document",
    name: "이진형의 문서6",
    parent: "group_000fadsf13114sdafds",
    children: null,
  },
  {
    _id: "group_1234fsdafsasd",
    type: "group",
    name: "이진형의 폴더4",
    parent: "group_000fadsf13114sdafds",
    children: [],
  },
];

router.get("/node_list", (req, res) => {
  console.log("res... (node_list)");

  // const params = req.params;
  const queries = req.query;
  const { id } = queries;

  // console.log("params:", params);
  console.log("queries:", queries);

  fn_service__GET__exp__node_list(id)
    .then((arr_data) => {
      console.log("DATA:", arr_data);

      if (arr_data.length === 0) {
        res.json(dummy_data__node_list);
      } else {
        res.json(arr_data);
      }
    })
    .catch((err) => {
      console.log("r:node_list");
    });
});

router.post("/add_doc", (req, res) => {
  console.log("res... (add_doc");

  const body = req.body;
  console.log("QUERY:", body);

  fn_service__POST__exp__add_node(body).then((obj_result) => {
    res.json(obj_result);
  });
  // res.status(201);
});

router.post("/add_group", (req, res) => {
  console.log("res... (add_group)");

  const body = req.body;
  console.log("QUERY:", body);

  fn_service__POST__exp__add_node(body).then((obj_result) => {
    res.json(obj_result);
  });
});

module.exports = router;
