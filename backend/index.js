const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
const port = 3000;

/* MySQL Connection */
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "fullstack",
});

/* Connect to MySQL */
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("Connected to MySQL");
});

/* Middleware */
app.use(bodyParser.json());
app.use(cors());

/* Routes */
/* List all players */
app.get("/players", (req, res) => {
  db.query("SELECT * FROM players", (err, results) => {
    if (err) {
      res.status(500).send("Error fetching players");
      return;
    }
    res.json(results);
    console.log(results);
  });
});

/* Create a new player */
app.post("/players/create", (req, res) => {
  const { name, team, position, pnumber, nationality, age } = req.body;
  db.query(
    "INSERT INTO players (name, team, position, pnumber, nationality, age) VALUES (?,?,?,?,?,?)",
    [name, team, position, pnumber, nationality, age],
    (err, result) => {
      if (err) {
        res.status(500).send("Error creating player");
        return;
      }
      const playerId = result.insertId;
      db.query(
        "SELECT * FROM players WHERE id = ?",
        playerId,
        (err, result) => {
          if (err) {
            res.status(500).send("Error fetching created player");
            return;
          }
          res.status(201).json(result[0]);
        }
      );
    }
  );
  console.log(res);
});

/* Get a specific player */
app.get("/players/:id", (req, res) => {
  const playerId = req.params.id;
  db.query("SELECT * FROM players WHERE id = ?", playerId, (err, result) => {
    if (err) {
      res.status(500).send("Error fetching player");
      return;
    }
    if (result.length === 0) {
      res.status(404).send("Player not found");
      return;
    }
    res.json(result[0]);
  });
});

/* Update a player */
app.put("/players/:id", (req, res) => {
  const playerId = req.params.id;
  const { name, team, position, pnumber, nationality, age } = req.body;
  db.query(
    "UPDATE players SET name = ?, team = ?, position = ?, pnumber= ?, nationality = ? WHERE id = ?",
    [name, team, position, pnumber, nationality, age, playerId],
    (err) => {
      if (err) {
        res.status(500).send("Error updating player");
        return;
      }
      db.query(
        "SELECT * FROM players WHERE id = ?",
        playerId,
        (err, result) => {
          if (err) {
            res.status(500).send("Error fetching updated player");
            return;
          }
          res.json(result[0]);
        }
      );
    }
  );
});

/* Delete a player */
app.delete("/players/:id", (req, res) => {
  const playerId = req.params.id;
  db.query("DELETE FROM players WHERE id = ?", playerId, (err) => {
    if (err) {
      res.status(500).send("Error deleting player");
      return;
    }
    res.status(200).json({ msg: "Player deleted successfully" });
  });
});

/* Start server */
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
