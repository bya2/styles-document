const process = require("process");
const path = require("path");
const dotenv = require("dotenv");
const express = require("express");

dotenv.config({
  path: path.resolve(__dirname, process.env.NODE_ENV ? ".env" : ".env.dev"),
});
const app = express();
const router = express.Router();
const api_router = express.Router();

const SCHEME = process.env.SCHEME || "http";
const HOST = process.env.HOST || "localhost";
const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

router.get("/user", (req, res) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Methods", "GET");
  // const { user: p_user } = req.params;
  // console.log(p_user);
  console.log("res...");
  res.json([
    {
      alt: "ok1",
      str_doc_name: "A",
    },
    {
      alt: "ok2",
      str_doc_name: "B",
    },
    {
      alt: "ok3",
      str_doc_name: "C",
    },
  ])
});

router.post("/doc", (req, res) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Methods", "POST");
  res.json(req.body);
});

api_router.get("/login", (req, res) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Methods", "GET");
  const obj_q = req.query;
  console.log(obj_q);
  res.status(200).json(obj_q); // axios.get(STR_URL, { params: state__obj_user_info })
});

app.use("/api", api_router);
app.use("/", router);

app.listen(PORT);
console.log(`${SCHEME}://${HOST}:${PORT}/`);