const express = require("express");
const cors = require("cors");
const pool = require("./database");
const app = express();

app.use(express.json());
app.use(cors());

app.get("/allusers", async (req, res) => {
  const result = await pool.query("SELECT * FROM accounts");

  res.status(200).send(result.rows);
});

app.post("/adduser", async (req, res) => {
  const username = req.body["username"];
  const password = req.body["password"];

  console.log(`Request received: ${JSON.stringify(req.body)}`);

  if (!username || !password) {
    res.status(400).send({
      errorMessage: "You must provide both values for username and password",
    });
    return;
  }

  try {
    const existingUsername = await pool.query(
      "SELECT count(*) from accounts where username = $1",
      [username]
    );

    console.log(JSON.stringify(existingUsername, null, 2), "EXIST");

    if (existingUsername.rows[0].count !== "0") {
      res.status(400).send({ errorMessage: "Such user already exists" });
      return;
    }

    await pool.query(
      `INSERT INTO accounts (username, password) VALUES ($1, $2)`,
      [username, password]
    );

    res.status(200).send({ status: "ok" });
  } catch (error) {
    res
      .status(500)
      .send({ errorMessage: `Couldn't create user, error: ${error.message}` });
  }
});

app.put("/changeuserdata", async (req, res) => {
  const username = req.body["username"];
  const password = req.body["password"];

  if (!username || !password) {
    res.status(400).send({
      errorMessage: "You must provide both values for username and password",
    });
    return;
  }


  try {
    const existingUsername = await pool.query(
      "SELECT count(*) from accounts where username = $1",
      [username]
    );

    console.log(JSON.stringify(existingUsername, null, 2), "EXIST");

    if (existingUsername.rows[0].count === "0") {
      res.status(400).send({ errorMessage: "Such user doesn't exist" });
      return;
    }

    await pool.query(
      "UPDATE accounts SET password = $1 WHERE username = $2",
      [password, username]
    );

    res.status(200).send({ status: "ok" });
  } catch (error) {
    res
      .status(500)
      .send({ errorMessage: `Couldn't update user, error: ${error.message}` });
  }
});


app.delete('/deleteuser', async (req, res) => {
  const username = req.body["username"];

  try {
    await pool.query(
      `DELETE FROM accounts WHERE username = $1`,
      [username]
    );

    res.status(200).send({ status: "ok" });
  } catch (error) {
    res.status(500).send({ errorMessage: `Couldn't delete user, error: ${error.message}`});
  }
});

app.listen(4000, () => console.log("Server is on localhost:4000"));
