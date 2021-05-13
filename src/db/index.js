const { Pool } = require('pg').native
export const pool = new Pool({
    user: process.env.USERDB,
    host: process.env.HOSTDB,
    database: process.env.DB,
    password: process.env.DBPASSWORD,
    port: process.env.DBPORT,
});
export default {
  query: (text, params, callback) => {
    return pool.query(text, params, callback);
  },
};

