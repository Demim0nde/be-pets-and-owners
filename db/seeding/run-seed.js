const devData = require("../data/dev-data");
const seed = require("./seed.js");
const db = require("../connection.js");

const runSeed = () => {
  return seed(devData).then(() => db.end());
};

runSeed();
