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
  ]);
});

const arr_usr_doc_elems = [
  {
    selector: "markdown",
    value: `
      # GFM
      
      ## Autolink literals
      
      www.example.com, https://example.com, and contact@example.com.
      
      ## Footnote
      
      A note[^1]
      
      [^1]: Big note.
      
      ## Strikethrough
      
      ~one~ or ~~two~~ tildes.
      
      ## Table
      
      | a | b  |  c |  d  |
      | - | :- | -: | :-: |
      
      ## Tasklist
      
      * [ ] to do
      * [x] done
    `,
  },
  {
    selector: "palette",
    value: `#000\r\n#fcfcfc #fd7891\t#fa6109\n#dfdfdf\t#adadad #d7d #d99 #d99 #111 sssss 101010`,
  },
];

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

api_router.get("/usr_doc_elems", (req, res) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Methods", "GET");
  res.json(arr_usr_doc_elems);
});

api_router.post("/add_doc_elem", (req, res) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Methods", "POST");
  res.json(req.body);
});

app.use("/api", api_router);
app.use("/", router);

app.listen(PORT);
console.log(`${SCHEME}://${HOST}:${PORT}/`);
