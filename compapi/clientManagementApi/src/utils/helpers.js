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

const generateDbJsonSelectObject = ({
  tablesFields = [],
  joinedTableNames = [],
  joinedFieldNames = [],
}) => {
  let select = "";

  for (let i in tablesFields) {
    select += `json_build_object(${tablesFields[i]
      .map((field) => `'${field}', ${joinedTableNames[i]}.${field}`)
      .join(", ")}`;

    if (tablesFields.length > 1) {
      if (i != 0) select += ")";

      if (i < tablesFields.length - 1) select += `, '${joinedFieldNames[i]}', `;
    }
  }

  select += ") as data";

  return select;
};

module.exports = {
  executeInsertOperation,
  generateDbJsonSelectObject,
};
