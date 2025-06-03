const express = require("express");
const app = express();
const db = require("./db/connection");

// Server
app.get("/api/owners{/:id}", async (request, response) => {
  try {
    const [ownerId] = Object.values(request.params);
    let result = {};
    if (!!ownerId) {
      result = await db.query(`SELECT * FROM owners WHERE owner_id = $1`, [
        ownerId,
      ]);
    } else {
      result = await db.query(`SELECT * FROM owners`);
    }
    const { rows } = result;
    if (rows.length > 1) {
      response.status(200).send(rows);
    } else if (rows.length > 0) {
      response.status(200).send(rows[0]);
    } else {
      response.status(404).send(rows);
    }
  } catch (err) {
    response.status(500).send(err);
    console.log(err);
  }
});

// Listen
module.exports = { app };
