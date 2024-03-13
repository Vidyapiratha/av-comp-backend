const { getPortalClientIdByUsername } = require("../queries/portalClient");
const { executeInsertOperation } = require("../utils/helpers");
const DB_TABLES = require("../database/tables");
const { USER_ROLES } = require("../utils/constants");
const {
  PERMISSION_DENIED,
  INTERNAL_SERVER_ERROR,
  INVALID_REQUEST,
} = require("../utils/createError");

const createPortalClient = async (args) => {
  const authUser = global.auth;
  if (authUser.role_name !== USER_ROLES.MASTER) throw PERMISSION_DENIED();

  const existedClientId = await getPortalClientIdByUsername(args.username);
  if (existedClientId)
    throw INVALID_REQUEST(`username '${args.username}' already existed!`);

  const portalClient = {
    username: args.username?.trim(),
    contact_name: args.contact_name?.trim(),
    contact_phone: args.contact_phone?.trim(),
    contact_email: args.contact_email?.trim(),
    address: args.address,
    created_by_id: authUser.id,
    updated_by_id: authUser.id,
  };

  const response = await executeInsertOperation({
    tableName: DB_TABLES.PORTAL_CLIENTS,
    inputAsObject: portalClient,
    returnColumnsAsString: "*",
  });
  if (response.error) throw INTERNAL_SERVER_ERROR();

  return response.data;
};

module.exports = {
  createPortalClient,
};
