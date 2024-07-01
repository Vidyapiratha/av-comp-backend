const { getClientPilotByEmail } = require("../queries/clientPilot");
const DB_TABLES = require("../database/tables");
// const { USER_ROLES } = require("../utils/constants");
const { createClientPilot } = require("../operations/createClientPilot");
const { updateClientPilot } = require("../operations/updateClientPilot");
const {
  PERMISSION_DENIED,
  INTERNAL_SERVER_ERROR,
  INVALID_REQUEST,
} = require("../utils/createError");
const response = require("../utils/response");

const createPilot = async (args) => {
  console.log("args.pilot_email:: ", args.pilot_email);
  const existedPilotEmail = await getClientPilotByEmail({
    email: args.pilot_email,
  });
  if (existedPilotEmail)
    throw INVALID_REQUEST(`email '${args.pilot_email}' already existed!`);
  const clientPilot = {
    client_id: args.clientId,
    pilot_active: args.pilot_active,
    pilot_firstname: args.pilot_firstname,
    pilot_lastname: args.pilot_lastname,
    pilot_dob: args.pilot_dob,
    pilot_email: args.pilot_email,
    pilot_jobtitle: args.pilot_jobtitle,
    pilot_portal_access: args.pilot_portal_access,
    pilot_portal_role: args.pilot_portal_role,
    pilot_notes: args.pilot_notes,
    pilot_created_on: new Date(),
    pilot_created_by: args.pilot_created_by,
    pilot_updated_on: new Date(),
    pilot_updated_by: args.pilot_updated_by,
  };

  const result = await createClientPilot(clientPilot);

  console.log(result);

  if (result.error) {
    throw INTERNAL_SERVER_ERROR();
  }

  return {
    message: "Pilot record is added to the system successfully",
    ...result,
  };
};

const updatePilot = async (args) => {
  // const authUser = global.auth;
  // if (authUser.role_name === USER_ROLES.USER) {
  //   throw PERMISSION_DENIED();
  // }
  // if (
  //   authUser.role_name === USER_ROLES.ADMIN ||
  //   authUser.role_name === USER_ROLES.SUPERADMIN
  // ) {
  //   if (authUser.client_id !== args.client_id) {
  //     throw PERMISSION_DENIED();
  //   }
  // }
  const updated_client_pilot = {
    client_id: args.clientId,
    pilot_active: args.pilot_active,
    pilot_firstname: args.pilot_firstname,
    pilot_lastname: args.pilot_lastname,
    pilot_dob: args.pilot_dob,
    pilot_email: args.pilot_email,
    pilot_jobtitle: args.pilot_jobtitle,
    pilot_portal_access: args.pilot_portal_access,
    pilot_portal_role: args.pilot_portal_role,
    pilot_notes: args.pilot_notes,
    pilot_updated_on: new Date(),
    pilot_updated_by: args.pilot_updated_by,
  };
  // const condition_Object = {
  //   id: args.id?.trim(),
  // };
  const result = await updateClientPilot(updated_client_pilot);

  return {
    message: "Pilot record is updated in the system successfully",
    ...result,
  };
};

module.exports = {
  createPilot,
  updatePilot,
};
