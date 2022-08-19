const { Pool } = require("pg")

const pool = new Pool({
  user: "root",
  host: "localhost",
  database: "bancosolar",
  password: "password",
  port: 5432,
  min: 2,
  max: 6,
  idleTimeoutMillis: 3000,
  connectionTimeoutMillis: 2000
});
module.exports = pool;