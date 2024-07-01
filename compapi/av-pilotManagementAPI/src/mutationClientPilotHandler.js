"use strict";

// const { setAuth } = require("./middlewares/auth");
const {
  createPilot,
  updatePilot,
} = require("./resolvers/mutationClientPilotResolver");
module.exports.handler = async (event) => {
  console.log("Received event:", JSON.stringify(event, 3));

  // await setAuth(event?.identity?.claims?.sub);
  try {
    console.log(event, "event");
    let result;
    switch (event.field) {
      case "createPilot": {
        console.log("Working!!");
        result = await createPilot(event.arguments);
        break;
      }
      case "updatePilot": {
        result = await updatePilot(event.arguments);
        break;
      }
      default:
        throw `Unknown field, unable to resolve ${event.field}`;
    }

    console.log("final result:: ", result);

    return result;
  } catch (error) {
    console.log("Lambda error:", error);
    return Promise.reject(error);
  }
};
