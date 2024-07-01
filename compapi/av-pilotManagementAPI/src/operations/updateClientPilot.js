const DB_TABLES = require("../database/tables");
const { executeUpdateOperation } = require("../utils/helpers");
const {
  INTERNAL_SERVER_ERROR,
  INVALID_FORMAT,
} = require("../utils/createError");
const {
  isValidName,
  isValidEmail,
  isValidRole,
  isFieldNotEmpty,
} = require("../utils/inputValidations");

const updateClientPilot = async ({
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
  pilot_updated_on,
  pilot_updated_by,
}) => {
  if (pilot_firstname && !isValidName(pilot_firstname)) {
    throw INVALID_FORMAT(
      `The value entered in the Field: pilot_firstname is in Invalid format!`
    );
  }
  if (pilot_lastname && !isValidName(pilot_lastname)) {
    throw INVALID_FORMAT(
      `The value entered in the Field: pilot_lastname is in Invalid format!`
    );
  }
  if (pilot_email && !isValidEmail(pilot_email)) {
    throw INVALID_FORMAT(
      `The value entered in the Field: pilot_email is in Invalid format!`
    );
  }

  if (pilot_portal_role && !isValidRole(pilot_portal_role)) {
    throw INVALID_FORMAT(
      `The value entered in the Field: pilot_portal_role is not a valid Role!`
    );
  }
  const clientUpdatePilotObject = {
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
    pilot_updated_on,
    pilot_updated_by,
  };

  const updatedClientPilot = {};
  Object.entries(clientUpdatePilotObject).forEach(([key, value]) => {
    if (isFieldNotEmpty(value)) {
      updatedClientPilot[key] = value;
    }
  });
  const condition_Object = {
    pilot_email: updatedClientPilot.pilot_email,
  };

  const response = await executeUpdateOperation({
    tableName: DB_TABLES.CLIENT_PILOTS,
    inputAsObject: updatedClientPilot,
    conditionAsObject: condition_Object,
    returnColumnsAsString: "*",
  });

  if (response.error) {
    throw INTERNAL_SERVER_ERROR();
  }

  console.log("response:: ", response);
  return response.data;
};

module.exports = {
  updateClientPilot,
};
