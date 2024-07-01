const { USER_ROLES } = require("./constants");
const { getPortalRoles } = require("../queries/portalRoles");
const isValidName = (name) => {
  console.log("name:: ", name);
  const nameRegex = /^[a-zA-Z]+$/;
  if (!name) return false;
  if (name.length > 254) return false;

  var valid = nameRegex.test(name);
  console.log("valid", valid);
  if (!valid) return false;

  return true;
};

const isValidEmail = (email) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!email) return false;

  if (email.length > 254) return false;

  var valid = emailRegex.test(email);
  if (!valid) return false;

  var parts = email.split("@");
  if (parts[0].length > 64) return false;

  var domainParts = parts[1].split(".");
  if (
    domainParts.some((part) => {
      return part.length > 63;
    })
  )
    return false;

  return true;
};

const isValidRole = (role) => {
  const existingRole = Object.values(USER_ROLES).includes(role);
  return existingRole;
};

const isFieldNotEmpty = (value) => {
  return value !== null && value !== undefined && value !== "";
};

// const dobValidation = (dob) => {
//   let error = new Error(message);
//   error.name = "NOT_FOUND";
//   error.code = 403;

//   return error;
// };
module.exports = {
  isValidName,
  isValidEmail,
  isValidRole,
  //   dobValidation,
  isFieldNotEmpty,
};
