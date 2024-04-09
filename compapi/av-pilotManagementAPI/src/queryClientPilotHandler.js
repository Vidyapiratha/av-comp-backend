"use strict";
const { setAuth } = require("./middlewares/auth");
const {
  getClientPilot,
  getClientPilots,
  getClientPilotByEmail,
} = require("./resolvers/queryClientPilotResolver");

module.exports.handler = async (event) => {
  console.log("Received event:", JSON.stringify(event, null, 2));

  const requestBody = JSON.parse(event.body);
  const { query, variables } = requestBody;


  const operationMatch = query.match(/\b(getClientPilot|getClientPilots|getClientPilotByEmail)\b/);
  const operationName = operationMatch ? operationMatch[0] : null;

  try {
    let result;
    switch (operationName) {
      case "getClientPilot": {
        result = await getClientPilot(variables);
        break;
      }
      case "getClientPilots": {
        result = await getClientPilots(variables);
        break;
      }
      case "getClientPilotByEmail": {
        result = await getClientPilotByEmail(variables);
        break;
      }
      default:
        throw `Unknown operation, unable to resolve ${operationName}`;
    }
    return {
      statusCode: 200,
      headers: {"Content-Type": "application/json"},
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
