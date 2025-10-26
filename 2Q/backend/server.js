import express from 'express';

const app = express();
const port = 3000;

// In-memory users array
const users = [];

app.use(express.json());

// POST /register
app.post('/register', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  if (users.find(user => user.username === username)) {
    return res.status(409).json({ message: 'Username already exists' });
  }

  users.push({ username, password });

  console.log('Registered users:', users);

  res.status(201).json({
    message: 'Registration successful',
    user: { username }
  });
});

// ✅ GET /users route to return all registered users
app.get('/users', (req, res) => {
  // Only send usernames, not passwords
  const safeUsers = users.map(user => ({ username: user.username }));
  res.json(safeUsers);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
