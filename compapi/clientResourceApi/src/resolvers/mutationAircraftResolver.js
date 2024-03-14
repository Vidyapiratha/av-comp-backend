const DB_TABLES = require("../database/tables");
const { USER_ROLES } = require("../utils/constants");
const {
  PERMISSION_DENIED,
  INTERNAL_SERVER_ERROR,
} = require("../utils/createError");
const { executeInsertOperation } = require("../utils/helpers");
const createAircraft = async (args) => {
  const authUser = global.auth;
  if (authUser.role_name === USER_ROLES.USER) {
    throw PERMISSION_DENIED();
  }
  if (
    authUser.role_name === USER_ROLES.ADMIN ||
    authUser.role_name === USER_ROLES.SUPERADMIN
  ) {
    if (authUser.client_id !== args.client_id) {
      throw PERMISSION_DENIED();
    }
  }
  const client_aircraft = {
    client_id: args.client_id?.trim(),
    uas_active: args.uas_active,
    uas_manufacturer: args.uas_manufacturer?.trim(),
    uas_model: args.uas_model?.trim(),
    uas_details: args.uas_details,
    created_by: authUser.id,
    updated_by: authUser.id,
  };
  const response = await executeInsertOperation({
    tableName: DB_TABLES.CLIENT_AIRCRAFTS,
    inputAsObject: client_aircraft,
    returnColumnsAsString: "*",
  });
  if (response.error) throw INTERNAL_SERVER_ERROR();

  return response.data;
};

module.exports = {
  createAircraft,
};
