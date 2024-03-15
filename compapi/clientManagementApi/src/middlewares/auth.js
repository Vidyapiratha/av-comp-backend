const { getPortalUserById } = require("../queries/portalUser");

const setAuth = async (userId) => {
  if (!userId) throw Error("Unauthorized!");

  const user = await getPortalUserById({ id: userId });
  if (!user) throw Error("Unauthorized!");

  console.log("The auth user:::", user);
  global.auth = user;
};

const validateIdentity = async (identity) => {
  if (!identity?.claims?.sub) throw Error("Unauthorized!");

  global.sub = identity.claims.sub;
};

module.exports = {
  setAuth,
  validateIdentity,
};
