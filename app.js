const express = require("express");
const app = express();
const db = require("./db/connection");

// Server
app.get("/api/owners{/:id}", async (request, response) => {
  try {
    const ownerId = Object.values(request.params);
    const { rows } = ownerId[0]
      ? await db.query(`SELECT * FROM owners WHERE owner_id = $1;`, ownerId)
      : await db.query(`SELECT * FROM owners;`);
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

app.get("/api/owners/:id/pets", (req, res) => {
  const ownerId = Object.values(req.params);
  return db
    .query(
      `SELECT * FROM pets JOIN owners ON pets.owner = owners.owner_id WHERE owner_id = $1;`,
      ownerId
    )
    .then(({ rows }) => {
      res.status(200).send(rows);
    })
    .catch((err) => console.log(err));
});

app.get("/api/pets", async (req, res) => {
  try {
    const { rows } =
      Object.keys(req.query)[0] === "temperament"
        ? await db.query(
            `SELECT * FROM pets WHERE temperament = $1;`,
            Object.values(req.query)
          )
        : await db.query(`SELECT * FROM pets;`);
    if (rows.length > 0) {
      res.status(200).send(rows);
    } else {
      res.status(500).send(rows);
    }
  } catch {
    (err) => {
      console.log(err);
    };
  }
});

// Listen
module.exports = { app };
