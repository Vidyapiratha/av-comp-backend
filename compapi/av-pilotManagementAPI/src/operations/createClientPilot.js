const DB_TABLES = require("../database/tables");
const { executeInsertOperation } = require("../utils/helpers");
const {
  INTERNAL_SERVER_ERROR,
  INVALID_FORMAT,
} = require("../utils/createError");
const {
  isValidName,
  isValidEmail,
  isValidRole,
} = require("../utils/inputValidations");

const createClientPilot = async ({
  client_id,
  pilot_active,
  pilot_firstname,
  pilot_lastname,
  pilot_dob,
  pilot_email,
  pilot_jobtitle,
  pilot_portal_access,
  pilot_portal_role,
  pilot_notes,
  pilot_created_on,
  pilot_created_by,
  pilot_updated_on,
  pilot_updated_by,
}) => {
  if (!isValidName(pilot_firstname)) {
    throw INVALID_FORMAT(
      `The value entered in the Field: pilot_firstname is in Invalid format!`
    );
  }
  if (!isValidName(pilot_lastname)) {
    throw INVALID_FORMAT(
      `The value entered in the Field: pilot_lastname is in Invalid format!`
    );
  }
  if (!isValidEmail(pilot_email)) {
    throw INVALID_FORMAT(
      `The value entered in the Field: pilot_email is in Invalid format!`
    );
  }

  if (!isValidRole(pilot_portal_role)) {
    throw INVALID_FORMAT(
      `The value entered in the Field: pilot_portal_role is not a valid Role!`
    );
  }

  const clientPilot = {
    client_id,
    pilot_active,
    pilot_firstname,
    pilot_lastname,
    pilot_dob,
    pilot_email,
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
  createClientPilot,
};
