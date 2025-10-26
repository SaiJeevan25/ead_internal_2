import express from "express";
import cors from "cors";
import fs from "fs";

const app = express();
const port = 3000;

// Enable CORS for frontend
app.use(cors({
  origin: "http://127.0.0.1:5500"
}));

app.use(express.json());

// In-memory array to store users
const users = [];

// Helper function to save users to a JSON file
function saveUsersToFile() {
  fs.writeFileSync('users.json', JSON.stringify(users, null, 2));
}

// POST /register
app.post("/register", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required" });
  }

  if (users.find(u => u.username === username)) {
    return res.status(409).json({ message: "Username already exists" });
  }

  users.push({ username, password });

  // Save all users to users.json
  saveUsersToFile();

  res.status(201).json({
    message: "Registration successful",
    user: { username },
    allUsers: users.map(u => ({ username: u.username })) // send only usernames
  });
});

// GET /users - fetch all registered users
app.get("/users", (req, res) => {
  res.json(users.map(u => ({ username: u.username })));
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
