import express from "express";
import cors from "cors";

const app = express();
const port = 3000;

// Enable CORS
app.use(cors());

// Middleware to log incoming requests
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.originalUrl}`);
  next();
});

// GET /info route
app.get("/info", (req, res) => {
  res.json({ message: "Server Information Route Accessed" });
});

// GET /status route
app.get("/status", (req, res) => {
  res.json({
    status: "Server is running",
    timestamp: new Date().toISOString()
  });
});

// Handle undefined routes
// Option 1: Using a regex route
app.all(/.*/, (req, res) => {
  res.status(404).json({ error: "Route not found" });
});


// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
