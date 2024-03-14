"use strict";
const { setAuth } = require("./middlewares/auth");
const {
  createAircraft,
  updateAircraft,
  updateAircraftStatus,
} = require("./resolvers/mutationAircraftResolver");
module.exports.handler = async (event) => {
  console.log("Received event:", JSON.stringify(event, 3));

  await setAuth(event?.identity?.claims?.sub);
  try {
    let result;
    switch (event.field) {
      case "createAircraft": {
        result = await createAircraft(event.arguments);
        break;
      }
      case "updateAircraft": {
        result = await updateAircraft(event.arguments);
        break;
      }
      case "updateAircraftStatus": {
        result = await updateAircraftStatus(event.arguments);
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
