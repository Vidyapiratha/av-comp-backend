"use strict";

const { setAuth } = require("./middlewares/auth");
const { createPortalClient } = require("./resolvers/mutationClientResolver");

module.exports.handler = async (event) => {
  console.log("Received event:", JSON.stringify(event, 3));

  await setAuth(event?.identity?.claims?.sub);

  try {
    let result;

    switch (event.field) {
      case "createPortalClient": {
        result = await createPortalClient(event.arguments);
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
