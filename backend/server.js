import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mysql from "mysql2/promise";

const app = express();
const PORT = 4000;

const pool = mysql.createPool({
  user: "root",
  password: "root",
  host: "localhost",
  database: "bank",
  port: 3306,
});

async function query(sql, params) {
  const [results] = await pool.execute(sql, params);
  return results;
}

const sql = "INSERT INTO users (username, password) VALUES (?,?)";
const params = ["Lena", "sommar"];
const result = await query(sql, params);

console.log("databas", result);

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Generera engångslösenord
function generateOTP() {
  // Generera en sexsiffrig numerisk OTP
  const otp = Math.floor(100000 + Math.random() * 900000);
  return otp.toString();
}

// Din kod här. Skriv dina arrayer

const users = [];
let account = [];
let session = [];

// Din kod här. Skriv dina routes:
app.post("/createAccount", (req, res) => {
  const data = req.body;
  data.id = 101 + users.length;
  users.push(data);
  const newAccount = [];

  newAccount.userId = 100 + users.length;
  newAccount.id = users.length;
  newAccount.amount = 0;
  account.push(newAccount);

  res.send("Posts recived");
});

app.post("/login", (req, res) => {
  const data = req.body;
  let loginSuccessful = false;
  let newSession = {};
  let usersAccount = {};
  for (let i = 0; i < users.length; i++) {
    if (
      users[i].username == data.username &&
      users[i].password == data.password
    ) {
      const token = generateOTP();
      newSession = { userId: users[i].id, token: token };
      session.push(newSession);

      loginSuccessful = true;
      break;
    }
  }

  if (loginSuccessful) {
    res.json({
      session: newSession,
    });
  } else {
    res.status(401).send({ message: "Invalid username or password" });
  }
});

app.post("/verifyLogin", (req, res) => {
  const { userId, token } = req.body;

  let usersAccount = null;
  let username = "";
  let verified = false;

  for (let i = 0; i < session.length; i++) {
    if (session[i].userId === userId && session[i].token === token) {
      usersAccount = account.find((acc) => acc.userId === userId);
      const user = users.find((user) => user.id === userId);
      if (user) {
        username = user.username;
      }
      verified = true;

      break;
    }
  }

  if (verified && usersAccount) {
    res.json({
      userId: usersAccount.userId,
      id: usersAccount.id,
      amount: usersAccount.amount,
      username: username,
    });
  } else {
    res.status(401).send({ message: "Login required" });
  }
});

app.post("/deposit", (req, res) => {
  let data = req.body;

  data.amount = parseInt(data.amount);
  let deposited = false;
  let accountValue = 0;
  for (let i = 0; i < account.length; i++) {
    if (data.userId === account[i].userId) {
      account[i].amount = parseInt(account[i].amount) + parseInt(data.amount);
      accountValue = parseInt(account[i].amount);
      deposited = true;
      break;
    }
  }
  if (deposited) {
    res.json({
      amount: accountValue,
    });
  } else {
    res.status(401).send({ message: "Login required" });
  }
});

app.post("/logOut", (req, res) => {
  const { userId, token } = req.body;
  const sessionIndex = session.findIndex(
    (s) => s.userId === userId && s.token === token
  );

  if (sessionIndex !== -1) {
    session.splice(sessionIndex, 1); // Remove the session
    res.send({ message: "Logout successful" });
  } else {
    res.status(401).send({ message: "Invalid session" });
  }
});
// Starta servern
app.listen(PORT, () => {
  console.log(`Bankens backend körs på http://localhost:${PORT}`);
});
