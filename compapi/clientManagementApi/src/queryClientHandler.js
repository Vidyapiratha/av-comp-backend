"use strict";

const { setAuth } = require("./middlewares/auth");
const {
  checkPortalClientCompanyNameAbility,
  getPortalClient,
  getPortalClients,
} = require("./resolvers/queryClientResolver");

module.exports.handler = async (event) => {
  console.log("Received event:", JSON.stringify(event, 3));

  await setAuth(event?.identity?.claims?.sub);

  try {
    let result;

    switch (event.field) {
      case "checkPortalClientCompanyNameAbility": {
        result = await checkPortalClientCompanyNameAbility(event.arguments);
        break;
      }
      case "getPortalClient": {
        result = await getPortalClient(event.arguments);
        break;
      }
      case "getPortalClients": {
        result = await getPortalClients(event.arguments);
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
