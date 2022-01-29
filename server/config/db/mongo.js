const DB_MONGO__HOST = process.env.DB_MONGO__HOST || "localhost";
const DB_MONGO__PORT = process.env.DB_MONGO__PORT || 27017;
const DB_MONGO__STORAGE = process.env.DB_MONGO__STORAGE || "sds";
const URI__DB_MONGO__SDS = `mongodb://${DB_MONGO__HOST}:${DB_MONGO__PORT}/${DB_MONGO__STORAGE}`;

const cfg__db_mongo = {
  HOST: DB_MONGO__HOST,
  PORT: DB_MONGO__PORT,
  STORAGE: DB_MONGO__STORAGE,
  URI: URI__DB_MONGO__SDS,
};

module.exports = cfg__db_mongo;
