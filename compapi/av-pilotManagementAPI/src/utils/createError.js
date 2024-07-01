const INVALID_REQUEST = (message = "invalid request!") => {
  let error = new Error(message);
  error.name = "INVALID_REQUEST";
  error.code = 400;

  return error;
};

const INTERNAL_SERVER_ERROR = (message = "internal server error!") => {
  let error = new Error(message);
  error.code = 500;

  return error;
};

const PERMISSION_DENIED = (
  message = "You don't have permission to access!"
) => {
  let error = new Error(message);
  error.name = "PERMISSION_DENIED";
  error.code = 401;

  return error;
};

const INVALID_FORMAT = (message = "Invalid Format in input field!") => {
  let error = new Error(message);
  error.name = "INVALID_FORMAT";
  error.code = 403;

  return error;
};

const NOT_FOUND = (message = "not found!") => {
  let error = new Error(message);
  error.name = "NOT_FOUND";
  error.code = 404;

  return error;
};

module.exports = ({ code = null, message, name = null }) => {
  let error = new Error(message);
  error.name = name;
  error.code = code;

  return error;
};

module.exports = {
  INVALID_REQUEST,
  NOT_FOUND,
  PERMISSION_DENIED,
  INTERNAL_SERVER_ERROR,
  INVALID_FORMAT,
};
