const { getPortalUserById } = require("../queries/portalUser");
const response = require("../utils/response");

const getMe = async () => {
  const authUserId = global.sub;

  const result = await getPortalUserById({
    id: authUserId,
  });

  return response({ result });
};

module.exports = {
  getMe,
};
