const { pgDbPromise } = require("../database/connection");

const getPortalRoles = async () => {
  let queryText = `SELECT p_u_r.role_name FROM portal_user_roles as p_u_r`;

  queryText += ` WHERE p_u_r.id IS NOT NULL`;

  const query = {
    text: queryText,
    values: [],
  };

  try {
    const pdDb = await pgDbPromise();

    let data = await pdDb.query(query);
    if (!data.length) {
      console.log(`There are no roles available in the system`);
      return null;
    }
    console.log(data);
    data = data[0];

    return data;
  } catch (error) {
    console.log("Error on getting roles:::", error);

    return null;
  }
};

module.exports = {
  getPortalRoles,
};
