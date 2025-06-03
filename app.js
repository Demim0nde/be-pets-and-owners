const express = require("express");
const app = express();
const db = require("./db/connection");

// Server
app.get("/api/owners/:id", async (request, response) => {
  try {
    const ownerId = Object.values(request.params);
    const { rows } = await db.query(
      `SELECT * FROM owners WHERE owner_id = $1`,
      ownerId
    );
    response.status(200).send(rows[0]);
  } catch (err) {
    response.status(500).send(err);
    console.log(err);
  }
});

// Listen
module.exports = { app };
