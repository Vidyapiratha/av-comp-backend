const initOptions = {
  schema: ["public"],
};

const pgp = require("pg-promise")(initOptions);
const { getSecret } = require("../utils/secrets");

const connectDB = async () => {
  const { username, password } = await getSecret(process.env.DB_SECRETS);
  console.log("the db user::", username, password);

  const pgConfig = {
    host: process.env.DB_HOST,
    port: 5432,
    database: process.env.DATABASE,
    user: username,
    password: password,
    idleTimeoutMillis: 3000,
    max: 10,
    min: 1,
    query_timeout: 10000,
    ssl: true,
  };

  const db = pgp(pgConfig);

  console.log("db connected");

  return db;
};

let pgDb = null;
const pgDbPromise = async () => {
  if (!pgDb) {
    try {
      pgDb = await connectDB();
    } catch (error) {
      console.log("db initialization error::", error);

      throw Error("Internal server error!");
    }
  }

  return pgDb;
};

const disconnectDB = () => pgp.end();

module.exports = {
  pgDbPromise,
  disconnectDB,
};
