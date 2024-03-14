"use strict";

const { validateIdentity, setAuth } = require("./middlewares/auth");
const {
  getMe,
  checkPortalUserAbility,
} = require("./resolvers/queryUserResolver");

module.exports.handler = async (event) => {
  console.log("Received event:", JSON.stringify(event, 3));

  validateIdentity(event?.identity);

  try {
    let result;

    switch (event.field) {
      case "getMe": {
        result = await getMe();
        break;
      }
      case "checkPortalUserAbility": {
        await setAuth(event?.identity?.claims?.sub);
        result = await checkPortalUserAbility(event.arguments);
        break;
      }

      default:
        throw `Unknown field, unable to resolve ${event.field}`;
    }

    return result;
  } catch (error) {
    console.log("Lambda error:", error);
    return Promise.reject(error);
  }
};
