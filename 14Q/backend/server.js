import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

// Setup
const app = express();
const PORT = 3000;

// Needed to emulate __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.get("/", (req, res) => {
  res.send("Product catalogue API is running ✅");
});

// In-memory product catalogue
let products = [];

// GET /products/:id
app.get("/products/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const product = products.find((p) => p.id === id);
  if (!product) return res.status(404).json({ message: "Product not found" });
  res.json(product);
});

// POST /products
app.post("/products", (req, res) => {
  const { id, name, category, price } = req.body;
  if (!id || !name || !category || !price)
    return res
      .status(400)
      .json({ message: "All fields are required: id, name, category, price" });

  if (products.some((p) => p.id === id))
    return res
      .status(400)
      .json({ message: "Product with this ID already exists" });

  const newProduct = { id, name, category, price };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

// Start server
app.listen(PORT, () =>
  console.log(`✅ Server running at http://localhost:${PORT}`)
);
