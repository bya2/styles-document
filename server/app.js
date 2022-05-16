/**
 * Module
 */
const process = require("process");
const path = require("path");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config({
  path: path.resolve(__dirname, process.env.NODE_ENV ? ".env" : ".env.dev"),
});

/**
 * Constant
 */
const { URI: URI__DB_MONGO__SDS } = require("./config/db/mongo");

const MSG__DB_CONNECTION = "CONN:\nLocation: /server/app (db.once:CONNECTED)\n";
const MSG__DB_RECONNECTION = "RE-CONN:\nLocation: /server/app (db.once:RECONNECTED)\n";
const MSG__DB_DISCONNECTION = "DIS-CONN:\nLocation: /server/app (db.on:DISCONNECTED)\n";

const ERR_MSG__DB_CONNECTION = "ERR:\nLocation: /server/app (db.on:ERROR)\n";

/**
 * App or Instance
 */
const app = express();

mongoose.connect(URI__DB_MONGO__SDS);
mongoose.set("bufferCommands", false);

const db = mongoose.connection;

db.on("error", (err) => {
  console.error(`${ERR_MSG__DB_CONNECTION}${err.message}`);
});
db.once("connected", () => {
  console.log(MSG__DB_CONNECTION);
});
db.on("reconnected", () => {
  console.log(MSG__DB_RECONNECTION);
});
db.on("disconnected", () => {
  console.log(MSG__DB_DISCONNECTION);
});

/**
 * Middleware
 */
// app.use(express.raw({ type: "application/x-www-form-urlencoded" }), (req, res, next) => {
//   req.body = JSON.parse(req.body);
//   next();
// });
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(cors());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3003");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Accept");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

// app.post("/api/sign_up", (req, res) => {
//   console.log("res...");
//   console.log(req.body);
//   res.status(201);
// });

app.use("/api", require("./api"));

module.exports = app;
