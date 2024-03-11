const initOptions = {
  schema: ["public"],
};

const pgp = require("pg-promise")(initOptions);

const pgConfig = {
  host: process.env.DB_HOST,
  port: 5432,
  database: process.env.DATABASE,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  idleTimeoutMillis: 3000,
  max: 10,
  min: 1,
  query_timeout: 10000,
  ssl: true,
};

const pgDb = pgp(pgConfig);

const disconnectDB = () => pgp.end();

module.exports = {
  pgDb,
  disconnectDB,
};
