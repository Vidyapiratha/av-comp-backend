const { pgDbPromise } = require("../database/connection");

const getPortalClientIdByUsername = async (username) => {
  const query = {
    text: `SELECT id FROM portal_clients
            WHERE username = $1 and NOT deleted limit 1`,
    values: [username],
  };

  try {
    const pdDb = await pgDbPromise();

    const data = await pdDb.query(query);
    if (!data.length) {
      console.log(`client not found with username: '${username}'`);
      return null;
    }

    return data[0].id;
  } catch (error) {
    console.log("Error on getting client:::", error);

    return null;
  }
};

const getPortalClientByUsername = async (username) => {
  const query = {
    text: `SELECT * FROM portal_clients
            WHERE username = $1 and NOT deleted limit 1`,
    values: [username],
  };

  try {
    const pdDb = await pgDbPromise();

    const data = await pdDb.query(query);
    if (!data.length) {
      console.log(`client not found with username: '${username}'`);
      return null;
    }

    return data[0];
  } catch (error) {
    console.log("Error on getting client:::", error);

    return null;
  }
};

const getPortalClientIdById = async (id) => {
  const query = {
    text: `SELECT id FROM portal_clients
            WHERE id = $1 and NOT deleted limit 1`,
    values: [id],
  };

  try {
    const pdDb = await pgDbPromise();

    const data = await pdDb.query(query);
    if (!data.length) {
      console.log(`client not found with id: '${id}'`);
      return null;
    }

    return data[0].id;
  } catch (error) {
    console.log("Error on getting client:::", error);

    return null;
  }
};

const getPortalClientById = async (id) => {
  const query = {
    text: `SELECT * FROM portal_clients
            WHERE id = $1 and NOT deleted limit 1`,
    values: [id],
  };

  try {
    const pdDb = await pgDbPromise();

    const data = await pdDb.query(query);
    if (!data.length) {
      console.log(`client not found with id: '${id}'`);
      return null;
    }

    return data[0];
  } catch (error) {
    console.log("Error on getting client:::", error);

    return null;
  }
};

const getPortalClientsQuery = async ({
  offset = 0,
  limit = 100,
  sort = "ASC",
}) => {
  let queryText = "SELECT * FROM portal_clients as p_c";

  queryText += ` WHERE NOT p_c.deleted`;
  queryText += ` Order By p_c.username ${sort} OFFSET ${offset} LIMIT ${limit}`;

  try {
    const pdDb = await pgDbPromise();

    let data = await pdDb.query(queryText);

    console.log("The portal clients::", data);

    return data;
  } catch (error) {
    console.log("Error on getting clients:::", error);

    return { data: [], totalClients: null };
  }
};

module.exports = {
  getPortalClientIdByUsername,
  getPortalClientByUsername,
  getPortalClientIdById,
  getPortalClientById,
  getPortalClientsQuery,
};
