"use strict";
const { setAuth } = require("./middlewares/auth");
const { getAircraftByClientIdResolver, getAircraftByIdResolver } = require("./resolvers/queryAircraftResolver");
module.exports.handler = async (event) => {
  console.log("Received event:", JSON.stringify(event, 3));

  await setAuth(event?.identity?.claims?.sub);
  try {
    let result;
    switch (event.field) {
      case "getAircraftByClientId": {
        result = await getAircraftByClientIdResolver(event.arguments);
        break;
      }
      case "getAircraftById": {
        result = await getAircraftByIdResolver(event.arguments);
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
