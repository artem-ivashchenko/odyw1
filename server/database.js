const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  password: "root",
  host: "localhost",
  port: 5432,
  database: "odyw1",
});

// Запустіть це ОДИН раз, командою node ./database.js (в рутовому терміналі)

// pool
//   .query("CREATE DATABASE odyw1;")
//   .then((response) => {
//     console.log("Database created");
//     console.log(response);
//   })
//   .catch((err) => console.log(err));
// pool
//   .query(`CREATE TABLE accounts(
//       user_id serial PRIMARY KEY,
//       username VARCHAR ( 50 ) UNIQUE NOT NULL
//       password VARCHAR ( 50 ) UNIQUE NOT NULL)`)
//   .then((response) => {
//     console.log("Table created");
//     console.log(response);
//   })
//   .catch((err) => console.log(err));

module.exports = pool;
