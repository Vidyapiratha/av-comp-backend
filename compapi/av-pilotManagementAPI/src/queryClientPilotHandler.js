"use strict";
const { setAuth } = require("./middlewares/auth");
const {
  getPilot,
  getPilots,
  getPilotByEmail,
} = require("./resolvers/queryClientPilotResolver");

module.exports.handler = async (event) => {
  console.log("Received event: ", JSON.stringify(event, null, 2));

  // await setAuth(event?.identity?.claims?.sub);

  try {
    let result;
    switch (event.field) {
      case "getPilot": {
        result = await getPilot(event.arguments);
        break;
      }
      case "getPilots": {
        result = await getPilots(event.arguments);
        break;
      }
      case "getPilotByEmail": {
        result = await getPilotByEmail(event.arguments);
        break;
      }
      default:
        throw `Unknown operation, unable to resolve ${event.field}`;
    }
    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(result),
    };
  } catch (error) {
    console.log("Lambda error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal server error" }),
    };
  }
};
