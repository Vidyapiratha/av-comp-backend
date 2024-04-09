// const { getPortalRoleIdByName } = require("../queries/clientPilot");
const {
  executeInsertOperation,
  executeUpdateOperation,
} = require("../utils/helpers");
// const DB_TABLES = require("../database/tables");
// const { USER_ROLES } = require("../utils/constants");
// const { createUser } = require("../operations/createUser");
const {
  PERMISSION_DENIED,
  INTERNAL_SERVER_ERROR,
  INVALID_REQUEST,
} = require("../utils/createError");
const response = require("../utils/response");

// const createClientPilot = async (args) => {
//   // const authUser = global.auth;
//   // if (authUser.role_name !== USER_ROLES.MASTER) throw PERMISSION_DENIED();
//
//   // const existedUserId = await getPortalUserIdByEmail(args.email);
//   // if (existedClientId || existedUserId)
//   //   throw INVALID_REQUEST(`email '${args.email}' already existed!`);
//
//   const clientPilot = {
//     pilot_firstname: args.pilot_firstname,
//     pilot_lastname: args.pilot_lastname,
//     pilot_dob: args.pilot_dob,
//     pilot_email: args.pilot_email,
//     client_id: args.client_id,
//     pilot_jobtitle: args.pilot_jobtitle,
//     pilot_portal_access: args.pilot_portal_access,
//     pilot_portal_role: args.pilot_portal_role,
//     pilot_notes: args.pilot_notes,
//     pilot_created_on: new Date(),
//     pilot_created_by: args.pilot_created_by,
//     pilot_updated_on: new Date(),
//     pilot_updated_by: args.pilot_updated_by,
//   };
//
//   const result = await executeInsertOperation({
//     tableName: DB_TABLES.PORTAL_CLIENTS,
//     inputAsObject: clientPilot,
//     returnColumnsAsString: "*",
//   });
//   if (result.error) throw INTERNAL_SERVER_ERROR();
//
//   // const roleId = await getPortalRoleIdByName(USER_ROLES.SUPER_ADMIN);
//   // if (!roleId) throw INTERNAL_SERVER_ERROR();
//
//   // await createUser({
//   //   email: portalClient.email,
//   //   client_id: response.data.id,
//   //   first_name: portalClient.first_name,
//   //   last_name: portalClient.last_name,
//   //   phone: portalClient.phone,
//   //   role_id: roleId,
//   // });
//
//   return response({ result: result.data });
// };

const updateClientPilot = async (args) => {
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
  const client_pilot = {
    pilot_firstname: args.pilot_firstname,
    pilot_lastname: args.pilot_lastname,
    pilot_dob: args.pilot_dob,
    pilot_email: args.pilot_email,
    client_id: args.client_id,
    pilot_jobtitle: args.pilot_jobtitle,
    pilot_portal_access: args.pilot_portal_access,
    pilot_portal_role: args.pilot_portal_role,
    pilot_notes: args.pilot_notes,
    pilot_updated_on: new Date(),
    pilot_updated_by: args.pilot_updated_by,
  };
  const condition_Object = {
    id: args.id?.trim(),
  };
  const response = await executeUpdateOperation({
    tableName: DB_TABLES.CLIENT_PILOTS,
    inputAsObject: client_pilot,
    conditionAsObject: condition_Object,
    returnColumnsAsString: "*",
  });
  if (response.error) throw INTERNAL_SERVER_ERROR();

  return response.data;
};

module.exports = {
  createClientPilot,
  updateClientPilot,
};
