const { pgDbPromise } = require("../database/connection");

const getAircraftByClientId = async ({ clientId, limit, skip }) => {
  let queryText = `SELECT * FROM client_aircraft`;
  clientId && (queryText += ` WHERE client_id = '${clientId}'`);
  queryText += ` LIMIT ${limit} OFFSET ${skip}`;
  const query = {
    text: queryText,
    values: [],
  };

  let totalCountQueryText = `SELECT COUNT(*) AS totalCount FROM client_aircraft`;
  clientId && (totalCountQueryText += ` WHERE client_id = '${clientId}'`);
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
    console.log(`Total number of records ${totalCount}`);
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
