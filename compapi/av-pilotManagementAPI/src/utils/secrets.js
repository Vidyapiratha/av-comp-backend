const AWS = require("aws-sdk");

const getSecret = async (secretName) => {
  try {
    const sManager = new AWS.SecretsManager({
      region: "eu-west-2",
    });

    const variables = await sManager
      .getSecretValue({ SecretId: secretName })
      .promise();

    return JSON.parse(variables.SecretString);
  } catch (error) {
    console.log("Error while getting secret::", error);

    return null;
  }
};

module.exports = {
  getSecret,
};
