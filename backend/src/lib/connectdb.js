const { Pool } = require("pg");
const { pgConfig } = require("../config.js");
const pool = new Pool({
  connectionString:
    "postgres://jmreptzh:hR9qQNFyF9V6cl65L1iAFyZOji7yZiCj@cornelius.db.elephantsql.com/jmreptzh",
});

const fetch = async (sqlQuery, ...params) => {
  const client = await pool.connect();
  try {
    const {
      rows: [row],
    } = await client.query(sqlQuery, params.length ? params : null);
    return row;
  } catch (error) {
    throw new Error(error);
  } finally {
    await client.release();
  }
};

const fetchAll = async (sqlQuery, ...params) => {
  const client = await pool.connect();
  try {
    const { rows } = await client.query(
      sqlQuery,
      params.length ? params : null
    );
    return rows;
  } catch (error) {
    throw new Error(error);
  } finally {
    await client.release();
  }
};

module.exports = { fetch, fetchAll };
