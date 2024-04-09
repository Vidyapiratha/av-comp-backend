const DB_TABLES = require("../database/tables");
const { executeInsertOperation } = require("../utils/helpers");
const { INTERNAL_SERVER_ERROR } = require("../utils/createError");

const createPilot = async ({
  pilot_firstname,
  pilot_lastname,
  pilot_dob,
  pilot_email,
  client_id,
  pilot_jobtitle,
  pilot_portal_access,
  pilot_portal_role,
  pilot_notes,
  pilot_created_on,
  pilot_created_by,
  pilot_updated_on,
  pilot_updated_by,
}) => {
  const clientPilot = {
    pilot_firstname,
    pilot_lastname,
    pilot_dob,
    pilot_email,
    client_id,
    pilot_jobtitle,
    pilot_portal_access,
    pilot_portal_role,
    pilot_notes,
    pilot_created_on,
    pilot_created_by,
    pilot_updated_on,
    pilot_updated_by,
  };

  const response = await executeInsertOperation({
    tableName: DB_TABLES.CLIENT_PILOTS,
    inputAsObject: clientPilot,
    returnColumnsAsString: "*",
  });

  if (response.error) {
    throw INTERNAL_SERVER_ERROR();
  }

  return response.data;
};

module.exports = {
  createPilot,
};
