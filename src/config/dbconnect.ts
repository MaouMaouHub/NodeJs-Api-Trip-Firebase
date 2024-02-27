import mysql from "mysql";
import util from "util";
export const conn = mysql.createPool({
  connectionLimit: 10,
  host: process.env.host,
  user: process.env.user,
  password: process.env.password,
  database: process.env.database,
});

export const queryAsync = util.promisify(conn.query).bind(conn);
