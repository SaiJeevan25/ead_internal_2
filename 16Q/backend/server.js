const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const bodyParser = require('body-parser');
const users = require('./users');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Secret key for JWT (in production use env vars)
const JWT_SECRET = "supersecretkey123";

// ✅ LOGIN route — returns JWT token if credentials are correct
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  const user = users.find(u => u.username === username);
  if (!user) return res.status(401).json({ message: 'Invalid username' });

  const validPassword = bcrypt.compareSync(password, user.password);
  if (!validPassword) return res.status(401).json({ message: 'Invalid password' });

  // Create token
  const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: '1h' });

  res.json({ token });
});

// ✅ PROTECTED route — accessible only with valid JWT
app.get('/profile', (req, res) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.status(401).json({ message: 'Token required' });

  const token = authHeader.split(' ')[1];
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });
    res.json({ message: 'Welcome to your profile!', user });
  });
});

app.listen(5000, () => console.log('Server running on http://localhost:5000'));
