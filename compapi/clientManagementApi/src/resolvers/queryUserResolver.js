const {
  getPortalUserById,
  getPortalUserIdByEmail,
} = require("../queries/portalUser");
const response = require("../utils/response");
const { USER_ROLES } = require("../utils/constants");
const { PERMISSION_DENIED } = require("../utils/createError");

const getMe = async () => {
  const authUserId = global.sub;

  const result = await getPortalUserById({
    id: authUserId,
    fetchRelations: true,
  });

  return response({ result });
};

const checkPortalUserEmailAbility = async (args) => {
  const authUser = global.auth;
  if (
    authUser.role_name !== USER_ROLES.MASTER &&
    authUser.role_name !== USER_ROLES.CLIENT
  ) {
    throw PERMISSION_DENIED();
  }

  const existedUser = await getPortalUserIdByEmail(args.email);

  const result = {
    is_available: existedUser ? false : true,
  };

  return result;
};

module.exports = {
  getMe,
  checkPortalUserEmailAbility,
};
