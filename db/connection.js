const { Pool } = require("pg");
const ENV = process.env.NODE_ENV || "development";
const pathToCorrectEnvFile = `${__dirname}/../.env.${ENV}`;

require("dotenv").config({
  path: pathToCorrectEnvFile,
});

// const db = new Pool();

if (!process.env.PGDATABASE) {
  throw new Error("No PGDATABASE configured");
} else {
  console.log("Connected to:", process.env.PGDATABASE);
}

module.exports = new Pool();
