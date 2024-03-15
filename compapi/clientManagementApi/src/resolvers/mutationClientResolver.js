const { getPortalClientIdByCompanyName } = require("../queries/portalClient");
const { getPortalUserIdByEmail } = require("../queries/portalUser");
const { getPortalRoleIdByName } = require("../queries/portalUserRole");
const { executeInsertOperation } = require("../utils/helpers");
const DB_TABLES = require("../database/tables");
const { USER_ROLES } = require("../utils/constants");
const { createUser } = require("../operations/createUser");
const {
  PERMISSION_DENIED,
  INTERNAL_SERVER_ERROR,
  INVALID_REQUEST,
} = require("../utils/createError");
const response = require("../utils/response");

const createPortalClient = async (args) => {
  const authUser = global.auth;
  if (authUser.role_name !== USER_ROLES.MASTER) throw PERMISSION_DENIED();

  const existedUserId = await getPortalUserIdByEmail(args.email);
  if (existedClientId || existedUserId)
    throw INVALID_REQUEST(`email '${args.email}' already existed!`);

  const companyName = args.company_name.trim().toLocaleLowerCase();
  const existedCompany = await getPortalClientIdByCompanyName(companyName);
  if (existedCompany) {
    throw INVALID_REQUEST(`company '${companyName}' already existed!`);
  }

  const portalClient = {
    company_name: companyName,
    first_name: args.first_name?.trim(),
    last_name: args.last_name?.trim(),
    phone: args.phone,
    email: args.email,
    address: args.address,
    created_by_id: authUser.id,
    updated_by_id: authUser.id,
  };

  const result = await executeInsertOperation({
    tableName: DB_TABLES.PORTAL_CLIENTS,
    inputAsObject: portalClient,
    returnColumnsAsString: "*",
  });
  if (result.error) throw INTERNAL_SERVER_ERROR();

  const roleId = await getPortalRoleIdByName(USER_ROLES.SUPER_ADMIN);
  if (!roleId) throw INTERNAL_SERVER_ERROR();

  await createUser({
    email: portalClient.email,
    client_id: response.data.id,
    first_name: portalClient.first_name,
    last_name: portalClient.last_name,
    phone: portalClient.phone,
    role_id: roleId,
  });

  return response({ result: result.data });
};

module.exports = {
  createPortalClient,
};
