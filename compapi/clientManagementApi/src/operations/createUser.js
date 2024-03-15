const DB_TABLES = require("../database/tables");
const { createCognitoUser } = require("../queries/cognito");
const { executeInsertOperation } = require("../utils/helpers");
const { INTERNAL_SERVER_ERROR } = require("../utils/createError");

const createUser = async ({
  email,
  first_name,
  last_name,
  phone,
  client_id,
  role_id,
}) => {
  const portalUser = {
    email: email,
    first_name: first_name,
    last_name: last_name,
    phone: phone,
    client_id: client_id,
    user_role_id: role_id,
  };

  const cognitoUser = await createCognitoUser({
    email: portalUser.email,
    first_name: portalUser.first_name,
    last_name: portalUser.last_name,
    phone_number: portalUser.phone,
    client_id: portalUser.client_id,
  });
  if (!cognitoUser) {
    throw INTERNAL_SERVER_ERROR();
  }

  portalUser.id = cognitoUser.Username;

  const response = await executeInsertOperation({
    tableName: DB_TABLES.PORTAL_USERS,
    inputAsObject: portalUser,
    returnColumnsAsString: "*",
  });
  if (response.error) {
    throw INTERNAL_SERVER_ERROR();
  }

  return response.data;
};

module.exports = {
  createUser,
};
