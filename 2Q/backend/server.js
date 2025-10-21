// Import dependencies
const express = require("express");
const app = express();

// Middleware to parse JSON body
app.use(express.json());

// In-memory user storage
const users = [];

// POST /register route
app.post("/register", (req, res) => {
  const { username, password } = req.body;

  // Basic validation
  if (!username || !password) {
    return res.status(400).json({
      success: false,
      message: "Username and password are required.",
    });
  }

  // Check for duplicate usernames
  const userExists = users.find((u) => u.username === username);
  if (userExists) {
    return res.status(409).json({
      success: false,
      message: "Username already exists. Please choose another.",
    });
  }

  // Store user
  users.push({ username, password });

  // Respond with success
  res.status(201).json({
    success: true,
    message: "User registered successfully!",
    totalUsers: users.length,
    registeredUser: { username },
  });
});

// Optional: Get all users (for debugging)
app.get("/users", (req, res) => {
  res.json(users);
});

// Start server
const PORT = 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
