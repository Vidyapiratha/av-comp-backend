const { pgDbPromise } = require("../database/connection");

const executeInsertOperation = async ({
  tableName,
  inputAsObject,
  returnCreatedValue = true,
  returnColumnsAsString = "*",
}) => {
  const columnsAsString = Object.keys(inputAsObject).join(", ");
  const values = Object.values(inputAsObject);

  let dollars = Object.keys(inputAsObject)
    .map((_, i) => {
      return "$" + (i + 1);
    })
    .join(", ");

  let queryText = `INSERT INTO ${tableName} ( ${columnsAsString} ) VALUES ( ${dollars} )`;
  if (returnCreatedValue) queryText += ` RETURNING ${returnColumnsAsString}`;
  console.log("The query::", queryText);

  try {
    const pdDb = await pgDbPromise();

    let response = await pdDb.query({
      text: queryText,
      values: values,
    });

    console.log("The response::", response);

    if (response?.length) response = response[0];

    return { data: response };
  } catch (error) {
    console.log("The error while inserting to db::", error);

    return { error: true };
  }
};

module.exports = { executeInsertOperation };
