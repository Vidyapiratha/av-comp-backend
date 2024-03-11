const { getPortalUserById } = require("../queries/portalUser");

const setAuth = async (userId) => {
  if (!userId) throw Error("Unauthorized!");

  const user = await getPortalUserById(userId);
  if (!user) throw Error("Unauthorized!");

  console.log("The auth user:::", user);
  global.auth = user;
};

module.exports = {
  setAuth,
};
