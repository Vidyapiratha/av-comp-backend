const AWS = require("aws-sdk");
const cognitoIdentityServiceProvider = new AWS.CognitoIdentityServiceProvider();

const generatePassword = () => {
  return (
    Math.random().toString(36).slice(2) +
    Math.random().toString(36).toUpperCase().slice(2)
  );
};

const createCognitoUser = async ({
  first_name,
  last_name,
  email,
  phone_number,
  client_id,
}) => {
  let params = {
    UserPoolId: process.env.USER_POOL_ID,
    Username: email,
    DesiredDeliveryMediums: ["EMAIL"],
    ForceAliasCreation: true,
    TemporaryPassword: generatePassword(),
    UserAttributes: [
      {
        Name: "email",
        Value: email,
      },
      {
        Name: "email_verified",
        Value: "true",
      },
      {
        Name: "given_name",
        Value: first_name,
      },
      {
        Name: "family_name",
        Value: last_name,
      },
      {
        Name: "phone_number",
        Value: phone_number,
      },
      {
        Name: "phone_number_verified",
        Value: "true",
      },
      {
        Name: "custom:client_id",
        Value: client_id,
      },
    ],
  };

  try {
    const data = await cognitoIdentityServiceProvider
      .adminCreateUser(params)
      .promise();

    console.log("The created cognito user::", data);

    return data.User;
  } catch (error) {
    console.log("Error on createCognitoUser::", error);

    return null;
  }
};

const removeCognitoUser = async (id) => {
  let params = {
    UserPoolId: process.env.USER_POOL_ID,
    Username: id,
  };

  try {
    const data = await cognitoIdentityServiceProvider
      .adminDeleteUser(params)
      .promise();

    console.log("cognito user deleted::", data);

    return data.User;
  } catch (error) {
    console.log("Error on removeCognitoUser::", error);

    return null;
  }
};

module.exports = {
  createCognitoUser,
  removeCognitoUser,
};
