const {
  getPortalClientsQuery,
  getPortalClientById,
  getPortalClientIdByCompanyName,
} = require("../queries/portalClient");
const response = require("../utils/response");
const { USER_ROLES } = require("../utils/constants");
const { PERMISSION_DENIED } = require("../utils/createError");

const checkPortalClientCompanyNameAbility = async (args) => {
  const authUser = global.auth;
  if (authUser.role_name !== USER_ROLES.MASTER) throw PERMISSION_DENIED();

  const existedClientId = await getPortalClientIdByCompanyName(
    args.company_name
  );

  const result = {
    is_available: existedClientId ? false : true,
  };

  return result;
};

const getPortalClient = async (args) => {
  const authUser = global.auth;
  if (
    authUser.role_name !== USER_ROLES.MASTER &&
    authUser.role_name !== USER_ROLES.CLIENT
  ) {
    throw PERMISSION_DENIED();
  }

  const result = await getPortalClientById({ id: args.id });

  return response({
    result,
  });
};

const getPortalClients = async (args) => {
  const authUser = global.auth;
  if (authUser.role_name !== USER_ROLES.MASTER) throw PERMISSION_DENIED();

  let limit = args.limit || 100;
  let offset = args.offset || 0;
  let sort = args.sort || "ASC";

  const result = await getPortalClientsQuery({
    limit,
    offset,
    sort,
  });

  return response({
    result: result,
    others: args,
  });
};

module.exports = {
  getPortalClients,
  getPortalClient,
  checkPortalClientCompanyNameAbility,
};
