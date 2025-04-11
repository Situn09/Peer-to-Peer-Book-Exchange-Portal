// backend/routes/auth.js
const express = require("express");
const router = express.Router();
const path = require("path");

const { readJSON, writeJSON } = require("../utils/fileHelpers");

const usersFile = path.join(__dirname, "../data/users.json");

// Register
router.post("/register", async (req, res) => {
  const { name, email, mobile, password, role } = req.body;

  if (!name || !email || !password || !role) {
    return res.status(400).json({ message: "All fields are required." });
  }

  const users = await readJSON(usersFile);
  const userExists = users.find((u) => u.email === email);

  if (userExists) {
    return res.status(409).json({ message: "User already exists." });
  }

  const newUser = {
    id: Date.now(),
    name,
    email,
    mobile,
    password,
    role,
  };

  users.push(newUser);
  await writeJSON(usersFile, users);

  res
    .status(201)
    .json({ message: "User registered successfully.", user: newUser });
});

// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const users = await readJSON(usersFile);

  const user = users.find((u) => u.email === email && u.password === password);

  if (!user) {
    return res.status(401).json({ message: "Invalid credentials." });
  }

  res.status(200).json({ message: "Login successful", user });
});

module.exports = router;
