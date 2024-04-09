"use strict";

// const { setAuth } = require("./middlewares/auth");
const {
  createClientPilot,
  updateClientPilot,
} = require("./resolvers/mutationClientPilotResolver");
module.exports.handler = async (event) => {
  console.log("Received event:", JSON.stringify(event, 3));

  // await setAuth(event?.identity?.claims?.sub);
  try {
    console.log(event, "event");
    let result;
    switch (event.field) {
      case "createClientPilot": {
        console.log("Working!!");
        result = await createClientPilot(event.arguments);
        break;
      }
      case "updateClientPilot": {
        result = await updateClientPilot(event.arguments);
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
