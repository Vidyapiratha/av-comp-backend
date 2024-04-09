const response = require("../utils/response");
const { USER_ROLES } = require("../utils/constants");
const { PERMISSION_DENIED } = require("../utils/createError");
const {
  getClientPilotIdById,
  getPilotIdByEmail,
  getClientPilotsQuery,
} = require("../queries/clientPilot");


const getClientPilot = async (args) => {
  const authUser = global.auth;
  // if (authUser.role_name === USER_ROLES.USER) {
  //   throw PERMISSION_DENIED();
  // }
  //
  // if (
  //     authUser.role_name === USER_ROLES.ADMIN ||
  //     authUser.role_name === USER_ROLES.SUPERADMIN
  // ) {
  //   if (!args?.clientId) throw INVALID_REQUEST();
  //   if (authUser.client_id !== args.clientId) {
  //     throw PERMISSION_DENIED();
  //   }
  // }
  const result = await getClientPilotIdById({ id: args.id });

  return response({
    result,
  });
};

const getClientPilots = async (args) => {
  const authUser = global.auth;
  // if (authUser.role_name !== USER_ROLES.MASTER) throw PERMISSION_DENIED();

  let limit = args.limit || 10;
  let offset = args.offset || 0;
  let sort = args.sort || "ASC";

  const result = await getClientPilotsQuery({
    limit,
    offset,
    sort,
  });
  console.log("results:: ", result);
  return response({
    result: result,
    others: args,
  });
};

const getClientPilotByEmail = async (args) => {
  const authUser = global.auth;
  // if (
  //   authUser.role_name !== USER_ROLES.MASTER &&
  //   authUser.role_name !== USER_ROLES.CLIENT
  // ) {
  //   throw PERMISSION_DENIED();
  // }

  const result = await getPilotIdByEmail({ email: args.pilot_email });

  return response({
    result,
  });
};

module.exports = {
  getClientPilots,
  getClientPilot,
  getClientPilotByEmail
};
