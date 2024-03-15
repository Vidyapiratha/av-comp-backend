const { pgDbPromise } = require("../database/connection");

const getAircraftByClientId = async ({ clientId, limit, skip, isActive }) => {
  let queryText = `SELECT * FROM client_aircraft`;
  if (clientId) {
    queryText += ` WHERE client_id = '${clientId}'`;
    if (isActive !== null) queryText += ` AND uas_active = ${isActive}`;
  } else {
    if (isActive !== null) queryText += ` WHERE uas_active = ${isActive}`;
  }

  queryText += ` LIMIT ${limit} OFFSET ${skip}`;
  console.log("The query is : ", queryText);
  const query = {
    text: queryText,
    values: [],
  };

  let totalCountQueryText = `SELECT COUNT(*) AS totalCount FROM client_aircraft`;
  if (clientId) {
    totalCountQueryText += ` WHERE client_id = '${clientId}'`;
    if (isActive !== null)
      totalCountQueryText += ` AND uas_active = ${isActive}`;
  } else {
    if (isActive !== null)
      totalCountQueryText += ` WHERE uas_active = ${isActive}`;
  }
  const totalCountQuery = {
    text: totalCountQueryText,
    values: [],
  };

  try {
    const pdDb = await pgDbPromise();

    let data = await pdDb.query(query);
    if (!data.length) {
      console.log(`Data not found: '${clientId}'`);
      //return null;
    }

    let totalCount = await pdDb.query(totalCountQuery);

    return {
      data: data.length ? data : null,
      totalCount:
        totalCount && totalCount.length > 0
          ? Number.parseInt(totalCount[0].totalcount)
          : 0,
    };
  } catch (error) {
    console.log("Error on getting user:::", error);

    return null;
  }
};

const getAircraftById = async (id) => {
  let queryText = `SELECT * FROM client_aircraft WHERE id = '${id}'`;
  const query = {
    text: queryText,
    values: [],
  };

  try {
    const pdDb = await pgDbPromise();

    let data = await pdDb.query(query);
    console.log("Aircraft Data", data);
    return data;
  } catch (error) {
    console.log("Error on getting user:::", error);

    return null;
  }
};

module.exports = {
  getAircraftByClientId,
  getAircraftById,
};
