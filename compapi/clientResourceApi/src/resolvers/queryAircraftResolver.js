const response = require("../utils/response");
const { USER_ROLES } = require("../utils/constants");
const { PERMISSION_DENIED } = require("../utils/createError");
const {
  getAircraftByClientId,
  getAircraftById,
} = require("../queries/clientAircraft");
const getAircraftByClientIdResolver = async (args) => {
  const authUser = global.auth;
  if (authUser.role_name === USER_ROLES.USER) {
    throw PERMISSION_DENIED();
  }

  if (
    authUser.role_name === USER_ROLES.ADMIN ||
    authUser.role_name === USER_ROLES.SUPERADMIN
  ) {
    if (!args?.clientId) throw INVALID_REQUEST();
    if (authUser.client_id !== args.clientId) {
      throw PERMISSION_DENIED();
    }
  }

  const result = await getAircraftByClientId({
    clientId: args.clientId,
    limit: args.limit,
    skip: args.skip,
  });

  return response({
    result,
  });
};

const getAircraftByIdResolver = async (args) => {
  const authUser = global.auth;
  if (authUser.role_name === USER_ROLES.USER) {
    throw PERMISSION_DENIED();
  }

  const result = await getAircraftById(args.id);

  if (result && result.length > 0) {
    if (
      authUser.role_name === USER_ROLES.ADMIN ||
      authUser.role_name === USER_ROLES.SUPERADMIN
    ) {
      if (authUser.client_id !== result[0].client_id) {
        throw PERMISSION_DENIED();
      }
    }
    return result[0];
  }

  return null;
};

module.exports = {
  getAircraftByClientIdResolver,
  getAircraftByIdResolver,
};
