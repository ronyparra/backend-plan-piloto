const { Pool } = require('pg').native
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'integralV2Backup',
    password: 'secreto',
    port: 5432,
});
export default {
  query: (text, params, callback) => {
    return pool.query(text, params, callback);
  },
};

