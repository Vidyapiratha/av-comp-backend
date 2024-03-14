const { pgDbPromise } = require("../database/connection");

const getPortalUserById = async ({ id }) => {
  let queryText = `SELECT p_u.*, p_r.role_name FROM portal_users as p_u 
        JOIN portal_user_roles as p_r
            ON p_u.user_role_id = p_r.id
        JOIN portal_clients as p_c
          On p_c.id = p_u.client_id`;

  queryText += ` WHERE p_u.id = $1 and 
    p_u.is_active AND p_c.enabled limit 1`;

  const query = {
    text: queryText,
    values: [id],
  };

  try {
    const pdDb = await pgDbPromise();

    let data = await pdDb.query(query);
    if (!data.length) {
      console.log(`user not found with id: '${id}'`);
      return null;
    }
    data = data[0];

    return data;
  } catch (error) {
    console.log("Error on getting user:::", error);

    return null;
  }
};

const getPortalUserIdByEmail = async (email) => {
  const query = {
    text: `SELECT id FROM portal_users
        WHERE email = $1 limit 1`,
    values: [email],
  };

  try {
    const pdDb = await pgDbPromise();

    const data = await pdDb.query(query);
    if (!data.length) {
      console.log(`user not found with email: '${email}'`);

      return null;
    }

    return data[0].id;
  } catch (error) {
    console.log("Error on getting user:::", error);

    return null;
  }
};

module.exports = {
  getPortalUserById,
  getPortalUserIdByEmail,
};
