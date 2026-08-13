const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Time Capsule backend is running!");
});

// Start Channeli OAuth login
app.get("/auth/channeli", (req, res) => {
  const clientId = process.env.CHANNELI_CLIENT_ID;

  const redirectUri = "http://localhost:5173/auth/callback";

  const channeliUrl =
    `https://channeli.in/oauth/authorise/` +
    `?client_id=${encodeURIComponent(clientId)}` +
    `&redirect_uri=${encodeURIComponent(redirectUri)}` +
    `&state=timecapsule`;

  res.redirect(channeliUrl);
});

const PORT = 5001;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});