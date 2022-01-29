const { SCHEME, HOST, PORT } = require("./config/server");

const process = require("process");
const mongoose = require("mongoose");
const app = require("./app");

app.listen(PORT, () => {
  console.log(`Running on port: ${PORT}\nURL: ${SCHEME}://${HOST}:${PORT}/`);
});

const fn_oper__shutdown_app = (msg) => {
  try {
    console.log(`Shutdown:\ninitiated: ${msg}`);
    mongoose.connection.close(false, () => {
      console.log("Close:\nMongoDB connection.");
      process.exit(0);
    });
  } catch (err) {
    console.error(
      `ERR:\nPath: /server/server (fn_oper__shutdown_app)\n${err.message}`
    );
    process.exit(1);
  }
};

process
  .on("SIGTERM", fn_oper__shutdown_app)
  .on("SIGINT", fn_oper__shutdown_app)
  .on("uncaughtException", fn_oper__shutdown_app)
  .on("unhandledRejection", fn_oper__shutdown_app);
