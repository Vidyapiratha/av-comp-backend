const {
  getPortalClientIdByUsername,
  getPortalClientsQuery,
} = require("../queries/portalClient");
const { USER_ROLES } = require("../utils/constants");
const { PERMISSION_DENIED } = require("../utils/createError");

const checkPortalClientUsernameAbility = async (args) => {
  const authUser = global.auth;
  if (authUser.role_name !== USER_ROLES.MASTER) throw PERMISSION_DENIED();

  const existedClientId = await getPortalClientIdByUsername(args.username);

  const result = {
    is_available: existedClientId ? false : true,
  };

  return result;
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

  return result;
};

module.exports = {
  checkPortalClientUsernameAbility,
  getPortalClients,
  getPortalClient,
};
