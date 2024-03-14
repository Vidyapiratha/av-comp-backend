const response = require("../utils/response");
const { USER_ROLES } = require("../utils/constants");
const { PERMISSION_DENIED } = require("../utils/createError");
const { getAircraftByClientId } = require("../queries/getAircraftByClientId");
const getAircraftByClientIdResolver = async (args) => {
  const authUser = global.auth;
  if (authUser.role_name === USER_ROLES.NORMAL) {
    throw PERMISSION_DENIED();
  }

  const result = await getAircraftByClientId({ clientId: args.clientId, limit: args.limit, skip: args.skip });

  return response({
    result,
  });
};

module.exports = {
  getAircraftByClientIdResolver,
};
