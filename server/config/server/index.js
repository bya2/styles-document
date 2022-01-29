const SCHEME = process.env.SCHEME || "http";
const HOST = process.env.HOST || "localhost";
const PORT = process.env.PORT || 8080;

const cfg__exp_server = {
  SCHEME,
  HOST,
  PORT,
};

module.exports = cfg__exp_server;
