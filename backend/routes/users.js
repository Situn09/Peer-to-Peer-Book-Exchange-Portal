// backend/routes/users.js
const express = require("express");
const router = express.Router();
const path = require("path");
const { readJSON } = require("../utils/fileHelpers");

const usersFile = path.join(__dirname, "../data/users.json");

// Get all users
router.get("/", async (req, res) => {
  const users = await readJSON(usersFile);
  res.json(users);
});

module.exports = router;
