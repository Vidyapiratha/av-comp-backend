const { pgDbPromise } = require("../database/connection");

const getClientPilotIdById = async (id) => {
  const query = {
    name: 'fetch-client-pilot-by-id',
    text: 'SELECT id FROM client_pilots WHERE id = $1 LIMIT 1',
    values: [id.id],
  };
  console.log(id);
  console.log(id.id);

  try {
    const pdDb = await pgDbPromise();
    const data = await pdDb.oneOrNone(query);

    if (!data) {
      console.log(`Client Pilot not found with id: '${id}'`);
      return null;
    }

    return data.id;
  } catch (error) {
    console.error("Error on getting client Pilot:", error);
    throw error; // It's often better to throw the error so the calling function can handle it
  }
};

// Function to get a pilot ID by email using a parameterized query
const getPilotIdByEmail = async (email) => {
  const query = {
    name: 'fetch-client-pilot-by-email',
    text: 'SELECT id FROM client_pilots WHERE pilot_email = $1 LIMIT 1',
    values: [email],
  };

  try {
    const pdDb = await pgDbPromise();
    const data = await pdDb.oneOrNone(query);

    if (!data) {
      console.log(`User not found with email: '${email}'`);
      return null;
    }

    return data.id;
  } catch (error) {
    console.error("Error on getting client Pilot:", error);
    throw error;
  }
};


const getClientPilotsQuery = async ({ offset = 0, limit = 1, sort = "ASC" }) => {
  const query = {
    name: 'fetch-client-pilots',
    text: `SELECT * FROM client_pilots ORDER BY pilot_firstname ${sort} OFFSET $1 LIMIT $2`,
    values: [offset, limit],
  };

  try {
    const pdDb = await pgDbPromise();
    const data = await pdDb.any(query);

    console.log("The client Pilots:", data);
    return data;
  } catch (error) {
    console.error("Error on getting client Pilots:", error);
    throw error;
  }
};

module.exports = {
  getClientPilotIdById,
  getPilotIdByEmail,
  getClientPilotsQuery,
};
