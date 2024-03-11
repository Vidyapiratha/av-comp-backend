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

module.exports = {
  getPortalClientIdByUsername,
  getPortalClientByUsername,
  getPortalClientIdById,
  getPortalClientById,
};
