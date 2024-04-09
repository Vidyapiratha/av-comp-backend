"use strict";

const { pgDbPromise } = require("../src/database/connection");

module.exports.handler = async (event) => {
  console.log("Received event:", JSON.stringify(event, null, 3));
  try {
    const db = await pgDbPromise();
    console.log("Success");
    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: "Connection to the database was successful.",
      }),
    };
  } catch (error) {
    console.log("Error on getting client Pilot:::", error);
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: "Failed to connect to the database." }),
    };
  }
};
